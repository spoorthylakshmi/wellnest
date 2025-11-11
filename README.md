<h1 align="center">🌿 WellNest</h1>
<h3 align="center">🧠 Mental Health Emotion Detection System</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.9+-blue?style=flat-square&logo=python" />
  <img src="https://img.shields.io/badge/Framework-Flask-green?style=flat-square&logo=flask" />
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange?style=flat-square&logo=html5" />
  <img src="https://img.shields.io/badge/ML-Logistic%20Regression-yellow?style=flat-square&logo=scikitlearn" />
</p>

---

## 🧩 Overview
**WellNest** is an AI-powered web application that helps users **understand their emotions through text**.  
It leverages **Natural Language Processing (NLP)** and **Machine Learning (ML)** to detect emotional tones such as joy, sadness, anger, and fear.  

🕊️ *Your words tell your feelings — WellNest listens.*

---

## ⚙️ Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Python, Flask |
| **ML Model** | Logistic Regression |
| **Data Source** | [Hugging Face — dair-ai/emotion](https://huggingface.co/datasets/dair-ai/emotion) |

---

## 🧱 Project Structure
wellnest/
│
├── backend/ # Flask API and ML model
│ ├── app.py # Main Flask app
│ ├── train_model.py # Model training script
│ ├── preview_dataset.py # Preview data samples
│ ├── merge_dataset.py # Dataset merging utility
│
├── frontend/ # Web interface
│ ├── index.html # Main UI for emotion detection
│ ├── style.css
│ └── script.js
│
├── datasets/ # Datasets used for training
│ ├── emotion_dataset.csv
│ ├── emotion_text.csv
│ ├── merged_dataset.csv
│ └── ...
│
├── models/ # Trained model & vectorizer
│ ├── emotion_model.pkl
│ └── vectorizer.pkl
│
└── README.md # Project documentation

---

## 🌟 Key Features

- 💬 **Emotion Detection:** Analyze and identify emotional tone from user text  
- ⚙️ **Flask API Backend:** Lightweight and fast prediction server  
- 🎨 **Interactive UI:** Clean and simple frontend for user interaction  
- 📊 **ML Model:** Trained using emotion datasets from Hugging Face  
- 💡 **Customizable:** Easy to retrain on new datasets or modify UI  

---

## 🧠 Model Insights

| Metric | Detail |
|:------:|:--------|
| **Algorithm** | Logistic Regression |
| **Accuracy** | ~87% |
| **Input** | Text string |
| **Output** | Emotion label → (`joy`, `anger`, `sadness`, `fear`, `love`, `surprise`) |

---

## 🚀 Getting Started

### 🔧 Prerequisites
Make sure you have the following installed:
- Python 3.8+
- Flask
- scikit-learn
- pandas

### 🪄 Installation
```bash
# Clone the repository
git clone https://github.com/your-username/WellNest.git
cd WellNest/backend

# Install dependencies
pip install -r requirements.txt

# Run the Flask app
python app.py
