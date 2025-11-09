from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os

app = Flask(__name__)

# ✅ Paths
model_dir = os.path.join(os.path.dirname(__file__), '../models')
model_path = os.path.join(model_dir, 'emotion_model.pkl')
vectorizer_path = os.path.join(model_dir, 'vectorizer.pkl')

# ✅ Load trained model & vectorizer
try:
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    print("✅ Model and vectorizer loaded successfully!")
except Exception as e:
    print("⚠️ Model not loaded yet. Error:", e)
    model = None
    vectorizer = None

@app.route('/')
def home():
    return "🧠 Backend Connected Successfully! Emotion Detection API is running."

# 📨 Route to collect user input
@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    print("User Input:", data)
    return jsonify({"status": "success", "message": "Data received!"})

# 🔮 Route to predict emotion
@app.route('/predict', methods=['POST'])
def predict():
    if model is None or vectorizer is None:
        return jsonify({'error': 'Model not loaded. Train and save it first!'}), 500

    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Please provide text field'}), 400

    text = data['text']
    X = vectorizer.transform([text])
    prediction = model.predict(X)[0]

    # Optional: map numeric labels to readable emotions
    label_map = {
        0: "sadness",
        1: "joy",
        2: "love",
        3: "anger",
        4: "fear",
        5: "surprise"
    }
    emotion = label_map.get(int(prediction), "unknown")

    return jsonify({
        'text': text,
        'predicted_label': int(prediction),
        'emotion': emotion
    })

if __name__ == '__main__':
    app.run(debug=True)
