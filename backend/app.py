from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load model (will add later)
# model = joblib.load('model.pkl')

@app.route('/')
def home():
    return "Backend Connected Successfully!"

# Example route for collecting user input
@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    print("User Input:", data)
    # Later we’ll save this to CSV or DB
    return jsonify({"status": "success", "message": "Data received!"})

if __name__ == '__main__':
    app.run(debug=True)
