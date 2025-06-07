# 📸 CAPTIONARY: A United Platform 

It is a full-stack AI-powered web application that provides two core functionalities:
- **Text Summarization** (both extractive and abstractive)
- **Image Caption Generation** (deep learning-based visual understanding)

This platform offers a clean user interface built with **React**, connected to **Flask** backend that serves natural language and computer vision models.

---

## 🔧 Project Structure

```

CAPTIONARY/
│
├── frontend/                # React App for UI
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TextSummarizer.js
│   │   │   ├── ImageCaptioner.js
│   │   │   └── Loader.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── README.md (this file)
│
├── backend/                 # Flask API for ML models
│   ├── app.py               # Main API routes
|   └── Models/
      ├── caption_model.h5
      └── summarizer_model.pt
│   ├── static/              # Stores uploaded images
│   ├── requirements.txt
│
└── README.md                # Project documentation

````

---

## 📸 Screenshots

| Home | Text Summarizer | Image Captioner |
|------|------------------|------------------|
| <img src="https://github.com/user-attachments/assets/7696ed75-f193-41de-80d6-3e159cb295f8" alt="home" width="300"/> | <img src="https://github.com/user-attachments/assets/d098ac2f-9f49-41e5-bc94-d3d385f0db82" alt="text summary" width="300"/> | <img src="https://github.com/user-attachments/assets/cab36bd7-7594-4bd0-b87f-e3e830651318" alt="image caption" width="300"/> |


---

## 🌟 Features

### 📄 Text Summarization
- **Extractive Summary**: Highlights key sentences using NLP methods.
- **Abstractive Summary**: Generates human-like summaries using Transformer-based T5/BART.
- Real-time summary generation from user input.

### 🖼️ Image Captioning
- Upload any image to generate a meaningful caption.
- Uses CNN (ResNet50) + LSTM models to interpret visual features.

### 💻 Tech Stack
- **Frontend**: React, JavaScript, Axios, CSS3
- **Backend**: Flask, Python, TensorFlow
- **Other Tools**: Jupyter Notebooks (for training), Postman (for API testing), Git

---

## 🚀 Getting Started

### 🧩 Requirements
- Node.js and npm
- Python 3.x
- Flask and ML dependencies(tensorflow)

---

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm start
````

> Runs React app on `http://localhost:3000`

---

### 🧠 Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

> Flask server runs on `http://127.0.0.1:5000`

Make sure model weights and preprocessing pipelines are in place.

---

## 💡 Future Improvements

* Session Management
* Fine-tuning summarization and captioning models
* Deploy to cloud (Render, HuggingFace Spaces, or AWS)

---

## ⚠️ Known Issues

- Model loading time may delay captioning slightly.
- Summarization fails with extremely long or poor quality text.

 ---

### 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/my-feature`)
3. Commit your changes
4. Push to the branch
5. Create a pull request
⭐ Star this repo if you liked it!
   
---

### 🙋‍♀️ Support

#### For questions or suggestions, open an [Issue] or contact [ashwinisbisen@gmail.com](mailto:ashwinisbisen@gmail.com).
---

### THANK YOU !!
