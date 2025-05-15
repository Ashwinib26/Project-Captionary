from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications import DenseNet201
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import pickle
import os
from werkzeug.utils import secure_filename
import spacy
from transformers import T5ForConditionalGeneration, T5Tokenizer

app = Flask(__name__)
UPLOAD_FOLDER = "static/uploaded"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Load models
caption_model = load_model("backend/models/caption_model.keras")
tokenizer = pickle.load(open("backend/models/tokenizer.pkl", "rb"))
nlp = spacy.load("en_core_web_sm")

# Load DenseNet201 for feature extraction
cnn = DenseNet201(weights="imagenet", include_top=False, pooling="avg")
fe = Model(inputs=cnn.input, outputs=cnn.output)

# Load T5 model for abstractive summarization
t5_tokenizer = T5Tokenizer.from_pretrained("t5-base")
t5_model = T5ForConditionalGeneration.from_pretrained("t5-base")

# Define vocab size and max_length for caption generation
vocab_size = len(tokenizer.word_index) + 1
max_length = 34

def extract_features(image_path):
    img = load_img(image_path, target_size=(224, 224))
    img = img_to_array(img)
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    feature = fe.predict(img, verbose=0)
    return feature

def idx_to_word(integer):
    for word, index in tokenizer.word_index.items():
        if index == integer:
            return word
    return None

def predict_caption(feature):
    in_text = "startseq"
    for _ in range(max_length):
        sequence = tokenizer.texts_to_sequences([in_text])[0]
        sequence = pad_sequences([sequence], maxlen=max_length)
        y_pred = caption_model.predict([feature, sequence], verbose=0)
        y_pred = np.argmax(y_pred)
        word = idx_to_word(y_pred)
        if word is None or word == 'endseq':
            break
        in_text += " " + word
    return in_text.replace('startseq', '').replace('endseq', '').strip()

def extractive_summary(text, percentage=0.3):
    doc = nlp(text)
    word_frequencies = {}

    for word in doc:
        if word.text.lower() not in spacy.lang.en.stop_words.STOP_WORDS and word.text not in punctuation:
            word_frequencies[word.text] = word_frequencies.get(word.text, 0) + 1

    max_freq = max(word_frequencies.values())
    for word in word_frequencies.keys():
        word_frequencies[word] /= max_freq

    sentence_scores = {}
    for sent in doc.sents:
        for word in sent:
            if word.text in word_frequencies:
                sentence_scores[sent] = sentence_scores.get(sent, 0) + word_frequencies[word.text]

    sorted_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)
    select_length = int(len(sorted_sentences) * percentage)

    return " ".join([str(sent) for sent in sorted_sentences[:select_length]])

def abstractive_summary(text, word_limit=120):
    input_text = "summarize: " + text.strip()
    input_ids = t5_tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)
    summary_ids = t5_model.generate(input_ids, max_length=word_limit * 1.3, min_length=word_limit // 2, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = t5_tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

@app.route("/", methods=["GET", "POST"])
def index():
    caption = None
    summary = None
    filename = None

    if request.method == "POST":
        file = request.files["image"]
        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(file_path)

            feature = extract_features(file_path)
            caption = predict_caption(feature)

        text = request.form.get("input_text", None)
        if text:
            summary = extractive_summary(text)
            abstract_summary = abstractive_summary(text)
            return render_template("index.html", caption=caption, filename=filename, summary=summary, abstract_summary=abstract_summary)

    return render_template("index.html", caption=caption, filename=filename, summary=summary)

if __name__ == "__main__":
    app.run(debug=True)
