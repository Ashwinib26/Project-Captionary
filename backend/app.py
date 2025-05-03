from flask import Flask, request, jsonify
from models.extractive_summarizer import summarize_extractive
from models.abstractive_summarizer import summarize_abstractive
from models.image_captioner import generate_caption
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.json
    text = data.get("text", "")
    mode = data.get("mode", "extractive")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    if mode == "extractive":
        summary = summarize_extractive(text)
    else:
        summary = summarize_abstractive(text)
    return jsonify({"summary": summary})

@app.route("/caption", methods=["POST"])
def caption():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    image_file = request.files["image"]
    caption = generate_caption(image_file)
    return jsonify({"caption": caption})

if __name__ == "__main__":
    app.run(debug=True)
