from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

# 🔹 MongoDB + Streak imports
from bson import ObjectId
from database.db import users
from database.streak import update_visit_streak

# 🔹 Chatbot import
from chatbot.engine import get_bot_reply

# 🔹 Wellness videos import (NEW)
from videos import videos

app = Flask(__name__)

# Enable CORS
CORS(app, resources={
    r"/predict": {"origins": "*"},
    r"/api/chatbot": {"origins": "*"},
    r"/api/visit/*": {"origins": "*"},
    r"/voice-text": {"origins": "*"},
    r"/api/videos/*": {"origins": "*"}
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
    print("⚠️ Model not loaded yet:", e)
    model = None
    vectorizer = None


# -------------------------------
# Home Route
# -------------------------------
@app.route('/')
def home():
    return "WellNest backend is running successfully!"


# -------------------------------
# Voice-to-Text endpoint (NEW)
# -------------------------------
@app.route("/voice-text", methods=["POST"])
def voice_text():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({
            "status": "error",
            "message": "No text received"
        }), 400

    text = data["text"]

    print("📝 Voice converted text received:")
    print(text)

    return jsonify({
        "status": "success",
        "message": "Text received by backend"
    })


# -------------------------------
# Emotion Prediction
# -------------------------------
@app.route('/predict', methods=['POST'])
def predict():
    if model is None or vectorizer is None:
        return jsonify({'error': 'Model not loaded'}), 500

    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Text is required'}), 400

    X = vectorizer.transform([data['text']])
    prediction = model.predict(X)[0]

    label_map = {
        0: "sadness",
        1: "joy",
        2: "love",
        3: "anger",
        4: "fear",
        5: "surprise"
    }

    return jsonify({
        "emotion": label_map.get(int(prediction), "unknown")
    })


# -------------------------------
# Chatbot API
# -------------------------------
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Message required'}), 400

    reply = get_bot_reply(data['message'])
    return jsonify({"reply": reply})


# -------------------------------
# Wellness Videos (NEW)
# -------------------------------
@app.route("/api/videos", methods=["GET"])
def get_videos():
    return jsonify({
        "status": "success",
        "data": videos
    })


@app.route("/api/videos/<category>", methods=["GET"])
def get_videos_by_category(category):
    filtered = [v for v in videos if v["category"] == category]
    return jsonify({
        "category": category,
        "data": filtered
    })


# -------------------------------
# Website Visit Streak
# -------------------------------
@app.route('/api/visit/<user_id>', methods=['POST'])
def website_visit(user_id):
    try:
        user = users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        updated = update_visit_streak(user)
        users.update_one({"_id": ObjectId(user_id)}, {"$set": updated})

        return jsonify({
            "streak": updated["streak"],
            "badges": updated["badges"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# Run Server
# -------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
