import os
from dotenv import load_dotenv
from google import genai
import bcrypt
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from bson import ObjectId
from database.db import db, users, daily_logs
from database.streak import update_visit_streak
from chatbot.engine import get_bot_reply

load_dotenv()

gemini_client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# 🔹 Wellness videos import (NEW)
# TODO: Implement videos module
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

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    # Check if user already exists
    if users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 409

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    user = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "createdAt": datetime.utcnow()
    }

    result = users.insert_one(user)

    return jsonify({
        "message": "Signup successful",
        "user_id": str(result.inserted_id),
        "name": name
    }), 201
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    user = users.find_one({"email": email})

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    ):
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user_id": str(user["_id"]),
        "name": user["name"]
    }), 200

# -------------------------------
# Home Route
# -------------------------------
@app.route('/')
def home():
    return "WellNest backend is running successfully!"

@app.route("/api/physical-health/<user_id>", methods=["GET"])
def get_physical_health(user_id):
    data = daily_logs.find_one(
        {},
        sort=[("createdAt", -1)]   # latest entry
    )

    if not data:
        return jsonify({"message": "No physical health data found"}), 404

    return jsonify({
        "water_glasses": data.get("waterIntake", 0),
        "exercise_minutes": data.get("exerciseTime", 0),
        "sleep_hours": data.get("sleepHours", 0),
        "date": data.get("createdAt")
    }), 200



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
            "user_id": ObjectId(data.get("user_id")),
            "sleepHours": data.get("sleepHours"),
            "waterIntake": data.get("waterIntake"),
            "exerciseTime": data.get("exerciseTime"),
            "journalEntry": data.get("journalEntry"),
            "mood": data.get("mood"),
            "date": datetime.utcnow(),               # ✅ CORRECT
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
@app.route("/api/daily-log/<user_id>", methods=["GET"])
def get_user_logs(user_id):
    try:
        logs = list(daily_logs.find({"user_id": ObjectId(user_id)}))

        cleaned_logs = []
        for log in logs:
            cleaned_logs.append({
                "id": str(log["_id"]),
                "user_id": str(log["user_id"]),
                "mood": log.get("mood"),
                "sleepHours": log.get("sleepHours", 0),
                "exerciseTime": log.get("exerciseTime", 0),
                "waterIntake": log.get("waterIntake", 0),
                "createdAt": log.get("createdAt").isoformat() if log.get("createdAt") else None,
            })

        return jsonify(cleaned_logs), 200

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": "Failed to fetch logs"}), 500

@app.route("/api/badges", methods=["GET"])
def get_badges():
    badges = list(db.badges.find({}, {"_id": 0}))
    return jsonify(badges)
# -------------------------------
# Chatbot API
# -------------------------------
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message") if data else None

    if not user_message:
        return jsonify({"reply": "Please say something."}), 400

    prompt = f"""
    You are Wellnest, a calm and empathetic wellness assistant.
    You do not provide medical diagnoses.
    Be supportive and concise.

    User: {user_message}
    """

    try:
        response = gemini_client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=prompt
        )

        reply = response.candidates[0].content.parts[0].text

        return jsonify({"reply": reply}), 200

    except Exception as e:
        print("🔥 GEMINI CHAT ERROR:", repr(e))
        return jsonify({
            "reply": "Sorry, I'm having trouble responding right now."
        }), 500

@app.route("/api/list-models", methods=["GET"])
def list_models():
    models = gemini_client.models.list()
    return jsonify([m.name for m in models])




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
    

@app.route("/api/tracker/<user_id>", methods=["GET"])
def get_tracker(user_id):
    from datetime import datetime, timedelta
    from bson import ObjectId

    logs = list(
        daily_logs.find(
            {"user_id": ObjectId(user_id)}
        ).sort("date", -1)
    )
    print("USER ID FROM FRONTEND:", user_id)

    print("LOGS FOUND:", logs)
    print("RAW LOGS:", logs)
    print("TYPE OF DATE:", type(logs[0]["date"]) if logs else "No logs")

    if not logs:
        return jsonify({
            "streak": {
                "current": 0,
                "longest": 0,
                "thisWeek": [False] * 7
            },
            "progress": [],
            "recentActivities": []
        })

    # --------------------
    # STREAK CALCULATION
    # --------------------
    # Get unique log dates (remove duplicates)
    try:
        log_dates = sorted(
            list({log["date"].date() for log in logs}),
            reverse=True
        )
    except Exception as e:
        print(f"Error extracting log dates: {e}")
        log_dates = []

    current_streak = 0
    longest = 0

    if log_dates:
        today = datetime.utcnow().date()
        
        # Find the most recent log date
        most_recent_log = log_dates[0]
        days_since_last_log = (today - most_recent_log).days

        # Calculate current streak (including today and yesterday)
        if days_since_last_log <= 1:
            current_streak = 1
            # Count consecutive days backwards from the most recent log
            for i in range(1, len(log_dates)):
                if (log_dates[i - 1] - log_dates[i]).days == 1:
                    current_streak += 1
                else:
                    break
        else:
            current_streak = 0

        # Calculate longest streak across all dates
        if len(log_dates) > 0:
            temp_streak = 1
            for i in range(1, len(log_dates)):
                if (log_dates[i - 1] - log_dates[i]).days == 1:
                    temp_streak += 1
                    longest = max(longest, temp_streak)
                else:
                    temp_streak = 1
            longest = max(longest, temp_streak) if temp_streak >= 1 else 1

        # --------------------
        # THIS WEEK
        # --------------------
        today = datetime.utcnow().date()
        week_start = today - timedelta(days=today.weekday())
        this_week = [False] * 7

        for log in logs:
            d = log["date"].date()
            if week_start <= d <= today:
                this_week[d.weekday()] = True



        # --------------------
        # PROGRESS (TEMP / BASIC)
        # --------------------
          progress = [
            {"label": "Mental Wellness", "progress": 70},
            {"label": "Physical Activity", "progress": 60},
            {"label": "Sleep Quality", "progress": 80},
            {"label": "Mindfulness", "progress": 65},
        ]

      
        # --------------------
        # RECENT ACTIVITIES
        # --------------------
     

# -------------------------------
# Run Server
# -------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
