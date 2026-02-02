from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

# 🔹 MongoDB + Streak imports (NEW)
from bson import ObjectId
from database.db import users
from database.streak import update_visit_streak


# 🔹 Chatbot import (EXISTING)
from chatbot.engine import get_bot_reply

app = Flask(__name__)

# Enable CORS
CORS(app, resources={
    r"/predict": {"origins": "*"},
    r"/api/chatbot": {"origins": "*"},
    r"/api/visit/*": {"origins": "*"}   # NEW
})

# 🔹 Paths
BASE_DIR = os.path.dirname(__file__)
model_dir = os.path.join(BASE_DIR, 'models')
model_path = os.path.join(model_dir, 'emotion_model.pkl')
vectorizer_path = os.path.join(model_dir, 'vectorizer.pkl')

# 🔹 Load trained model & vectorizer
try:
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    print("✅ Model and vectorizer loaded successfully!")
except Exception as e:
    print("⚠️ Model not loaded yet. Error:", e)
    model = None
    vectorizer = None


# 🔹 Home Route
@app.route('/')
def home():
    return "🧠 Backend Connected Successfully! Emotion Detection & Chatbot API is running."


# 🔹 Route to collect user input
@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    print("User Input:", data)
    return jsonify({"status": "success", "message": "Data received!"})


# 🔹 Emotion Prediction Route
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


# 🤖 Rule-Based Chatbot Route
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()

    if not data or 'message' not in data:
        return jsonify({'error': 'Message is required'}), 400

    user_message = data['message']
    reply = get_bot_reply(user_message)

    return jsonify({
        "reply": reply,
        "success": True
    })


# 🔥 WEBSITE VISIT STREAK ROUTE (NEW – ADDED SAFELY)
@app.route('/api/visit/<user_id>', methods=['POST'])
def website_visit(user_id):
    try:
        user = users.find_one({"_id": ObjectId(user_id)})

        if not user:
            return jsonify({"error": "User not found"}), 404

        updated = update_visit_streak(user)

        users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": updated}
        )

        return jsonify({
            "message": "Visit recorded",
            "streak": updated["streak"],
            "badges": updated["badges"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 🔹 Run Server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

    
