# WellNest

A wellness web app that detects emotions from user text, tracks mood trends,
and offers an AI chat assistant.

Built at [Hackathon name], Dec 2025 | Team of [N]

## Problem
People struggle to maintain physical and mental wellbeing due to busy lifestyles.
WellNest helps users [check in on their mood, see trends, get guidance].

## Features
- User registration and login with bcrypt-hashed passwords
- Emotion detection from text across 6 categories
- Mood trend dashboards with Recharts
- AI chat assistant powered by the Gemini API
- [Any other feature you actually built]

## Tech Stack
| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Recharts |
| Backend | Python, Flask, Flask-CORS, REST APIs |
| Database | MongoDB (pymongo) |
| ML | scikit-learn (TF-IDF + Logistic Regression), pandas, joblib |
| AI | Google Gemini API |

## How the emotion model works
Text is converted to numeric features with a TF-IDF vectorizer (5,000 words,
unigrams), then classified into 6 emotions by a Logistic Regression model.
Both are saved with joblib in `models/` and loaded by the Flask API.
- Dataset: [name and source] in `dataset/`
- Accuracy: [add when you have it]

## Project Structure
```
backend/    Flask API, auth, model loading, Gemini integration
frontend/   React app
models/     emotion_model.pkl, vectorizer.pkl
dataset/    training data
```

## Setup
**Prerequisites:** Python 3.x, Node.js, a MongoDB instance, a Gemini API key

**Backend**
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env     # then add your own values
python [app.py]
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create `backend/.env`:
```
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```



## Limitations and Future Work
- Bag-of-words ignores word order, so it can miss negation and sarcasm
- Possible upgrade: a transformer-based emotion model
- 

## Teammates
- Spoorthy Lakshmi G
- Ashwini
Seemalahari d
