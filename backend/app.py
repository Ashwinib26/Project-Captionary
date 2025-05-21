from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model, Model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications import DenseNet201
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import pickle
import os
from werkzeug.utils import secure_filename
import spacy
from transformers import T5ForConditionalGeneration, T5Tokenizer
from string import punctuation
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS with explicit config (for safety)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# File upload setup
UPLOAD_FOLDER = "static/uploaded"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load models and tokenizers
caption_model = load_model("models/caption_model.keras")
tokenizer = pickle.load(open("models/tokenizer.pkl", "rb"))
nlp = spacy.load("en_core_web_sm")

# CNN model for feature extraction
cnn = DenseNet201(weights="imagenet", include_top=False, pooling="avg")
fe = Model(inputs=cnn.input, outputs=cnn.output)

# T5 model for summarization
t5_tokenizer = T5Tokenizer.from_pretrained("t5-base")
t5_model = T5ForConditionalGeneration.from_pretrained("t5-base")

vocab_size = len(tokenizer.word_index) + 1
max_length = 34

# ---------- Utility Functions ---------- #

def extract_features(image_path):
    img = load_img(image_path, target_size=(224, 224))
    img = img_to_array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return fe.predict(img, verbose=0)

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
    max_freq = max(word_frequencies.values(), default=1)
    for word in word_frequencies:
        word_frequencies[word] /= max_freq
    sentence_scores = {}
    for sent in doc.sents:
        for word in sent:
            if word.text in word_frequencies:
                sentence_scores[sent] = sentence_scores.get(sent, 0) + word_frequencies[word.text]
    sorted_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)
    select_length = max(1, int(len(sorted_sentences) * percentage))
    return " ".join([str(sent) for sent in sorted_sentences[:select_length]])

def abstractive_summary(text, word_limit=120):
    input_text = "summarize: " + text.strip()
    input_ids = t5_tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)
    summary_ids = t5_model.generate(
        input_ids, max_length=int(word_limit * 1.3), min_length=word_limit // 2,
        length_penalty=2.0, num_beams=4, early_stopping=True
    )
    return t5_tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# ---------- API Routes ---------- #

@app.route("/api/caption", methods=["POST"])
def generate_caption():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    try:
        feature = extract_features(file_path)
        caption = predict_caption(feature)
        print("Generated caption:", caption)  # Debug print for logs
        return jsonify({"caption": caption})
    except Exception as e:
        print("Error generating caption:", e)
        return jsonify({"error": "Failed to process image"}), 500

@app.route("/api/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json()
        text = data.get("text", "")
        if not text.strip():
            return jsonify({"error": "No text provided"}), 400
        extractive = extractive_summary(text)
        abstractive = abstractive_summary(text)
        return jsonify({
            "extractive_summary": extractive,
            "abstractive_summary": abstractive
        })
    except Exception as e:
        print("Error in summarization:", e)
        return jsonify({"error": "Summarization failed"}), 500

# ---------- Run App ---------- #

if __name__ == "__main__":
    app.run(debug=True)
