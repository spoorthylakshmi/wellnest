
# Updated app.py to test GitHub push

from flask import Flask, request, jsonify
from flask_cors import CORS
from videos import videos   # <-- NEW import

app = Flask(__name__)
CORS(app)

# -------------------------------
# Home route
# -------------------------------
@app.route("/")
def home():
    return "WellNest backend is running successfully!"

# ------------------------------------
# Voice-to-Text endpoint
# ------------------------------------
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
    print("--------------------------------")

    return jsonify({
        "status": "success",
        "message": "Text received by backend"
    })

# ------------------------------------
# Wellness Video Suggestions (ALL)
# ------------------------------------
@app.route("/api/videos", methods=["GET"])
def get_videos():
    return jsonify({
        "status": "success",
        "message": "Wellness video suggestions fetched successfully",
        "data": videos
    })

# ------------------------------------
# Wellness Videos by Category
# ------------------------------------
@app.route("/api/videos/<category>", methods=["GET"])
def get_videos_by_category(category):
    filtered = [v for v in videos if v["category"] == category]

    return jsonify({
        "status": "success",
        "category": category,
        "data": filtered
    })

# -------------------------------
# Run the server
# -------------------------------
if __name__ == "__main__":
    app.run(port=3000, debug=True)