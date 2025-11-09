# 🌿 WellNest — Mental Health Emotion Detection System

### 🧠 Overview
**WellNest** is an AI-powered web application designed to analyze emotions from text to support mental well-being.  
It uses Natural Language Processing (NLP) and Machine Learning to detect emotional tone (e.g., joy, sadness, anger, fear) in user input.

---

## 🚀 Project Structure
wellnest/
│
├── backend/ # Flask API and ML model
│ ├── app.py # Main Flask application
│ ├── train_model.py # Model training script
│ ├── preview_dataset.py
│ ├── merge_dataset.py
│ ├── ...
│
├── frontend/ # Web interface (HTML/CSS/JS)
│ ├── index.html # User-facing emotion detection page
│
├── datasets/ # Datasets used for training
│ ├── emotion_dataset.csv
│ ├── emotion_text.csv
│ ├── merged_dataset.csv
│ ├── sentiment_analysis/
│ ├── chatbot_faq/
│ └── ...
│
├── models/ # Trained model and vectorizer
│ ├── emotion_model.pkl
│ └── vectorizer.pkl
│
└── README.md # Project documentation


---

## 🧩 Features
- 💬 **Text Emotion Detection** — Identify emotional tone from user input.
- ⚙️ **Flask Backend API** — Serves emotion predictions from the trained model.
- 🎨 **Frontend Web UI** — Simple HTML interface for user interaction.
- 📊 **Machine Learning Model** — Trained on Hugging Face emotion datasets.

---

## 🧠 Model Details
- **Dataset Used:** [`dair-ai/emotion`](https://huggingface.co/datasets/dair-ai/emotion)
- **Algorithm:** Logistic Regression
- **Accuracy:** ~87%
- **Input:** Text string  
- **Output:** Emotion label (joy, anger, sadness, etc.)

---

