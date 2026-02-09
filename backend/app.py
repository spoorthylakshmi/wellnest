from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
from database.db import users, daily_logs
from datetime import datetime

# 🔹 MongoDB + Streak imports
from bson import ObjectId
from database.db import users
from database.streak import update_visit_streak

# 🔹 Chatbot import
from chatbot.engine import get_bot_reply

# 🔹 Wellness videos import (NEW)
# from videos import videos

app = Flask(__name__)

# 🔹 Enable CORS

CORS(app)


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
@app.route("/api/daily-log", methods=["POST"])
def save_daily_log():
    try:
        data = request.get_json()
        print("🔥 DAILY LOG RECEIVED:", data)

        log = {
            "sleepHours": data.get("sleepHours"),
            "waterIntake": data.get("waterIntake"),
            "exerciseTime": data.get("exerciseTime"),
            "journalEntry": data.get("journalEntry"),
            "mood": data.get("mood"),
            "createdAt": datetime.utcnow()
        }

        daily_logs.insert_one(log)

        return jsonify({
            "status": "success",
            "message": "Daily log saved"
        }), 200

    except Exception as e:
        print("❌ ERROR SAVING DAILY LOG:", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# 🔹 Emotion Prediction Route (UPDATED WITH SOUND)
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

    # 🔊 Emotion → Sound mapping
    sound_map = {
        "sadness": "rain.mp3",
        "anger": "om.mp3",
        "fear": "jungle.mp3",
        "joy": "happy.mp3",
        "love": "calm.mp3",
        "surprise": "waves.mp3",
        "stress": "bowls.mp3"
    }

    sound = sound_map.get(emotion, "calm.mp3")

    return jsonify({
        "text": text,
        "predicted_label": int(prediction),
        "emotion": emotion,
        "sound": sound
    })
# -------------------------------
# Mood Analytics
# -------------------------------
@app.route("/api/mood-stats", methods=["GET"])
def mood_stats():
    logs = list(daily_logs.find())

    mood_count = {}
    for log in logs:
        mood = log.get("mood", "unknown")
        mood_count[mood] = mood_count.get(mood, 0) + 1

    return jsonify({
        "status": "success",
        "data": mood_count
    })

# -------------------------------
# Get Daily Wellness Logs
# -------------------------------
@app.route("/api/daily-log", methods=["GET"])
def get_daily_logs():
    logs = list(daily_logs.find().sort("createdAt", -1))

    for log in logs:
        log["_id"] = str(log["_id"])  # convert ObjectId for JSON

    return jsonify({
        "status": "success",
        "data": logs
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


# 🔥 WEBSITE VISIT STREAK ROUTE
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
