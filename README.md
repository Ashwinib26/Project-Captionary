# 📸 CAPTIONARY: United Platform for Image Caption Generation and Text Summary Generation

CAPTIONARY is a full-stack AI-powered web application that provides two core functionalities:
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
|   |── Models/
│   ├── static/              # Stores uploaded images
│   ├── requirements.txt
│
└── README.md                # Project documentation

````

---

## 🌟 Features

### 📄 Text Summarization
- **Extractive Summary**: Highlights key sentences using NLP methods.
- **Abstractive Summary**: Generates human-like summaries using transformer models (e.g., T5/BART).
- Real-time summary generation from user input.

### 🖼️ Image Captioning
- Upload any image to generate a meaningful caption.
- Uses CNN + LSTM/Transformer models to interpret visual features.

### 💻 Tech Stack
- **Frontend**: React, JavaScript, Axios, CSS3
- **Backend**: Flask, Python, TensorFlow
- **Other Tools**: Jupyter Notebooks (for training), Postman (for API testing), Git

---

## 🚀 Getting Started

### 🧩 Prerequisites
- Node.js and npm or yarn
- Python 3.x
- Flask and ML dependencies

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

* Add history and user login
* Support for PDF or image-to-text summarization
* Fine-tuning summarization and captioning models
* Deploy to cloud (Render, HuggingFace Spaces, or AWS)

---

### 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/my-feature`)
3. Commit your changes
4. Push to the branch
5. Create a pull request

---

### 🙋‍♀️ Support

#### For questions or suggestions, open an [Issue] or contact [ashwinisbisen@gmail.com](mailto:ashwinisbisen@gmail.com).
---

### THANK YOU !!
