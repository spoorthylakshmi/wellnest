import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 🔹 Go to project root (wellnest)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# 🔹 Dataset configurations
datasets_info = {
    "faq": {
        "path": os.path.join(BASE_DIR, "dataset", "chatbot_faq", "Mental_Health_FAQ.csv"),
        "text_col": "questions",
        "answer_col": "answers",
        "response_template": "{}"
    },
    "emotion": {
        "path": os.path.join(BASE_DIR, "dataset", "emotion_dataset.csv"),
        "text_col": "text",
        "answer_col": "label",
        "response_template": "Based on your message, you seem to be feeling {}. How can I help?"
    },
    "sentiment": {
        "path": os.path.join(BASE_DIR, "dataset", "sentiment_analysis", "sentiment_analysis.csv"),
        "text_col": "text",
        "answer_col": "sentiment",
        "response_template": "Your message appears to have a {} sentiment."
    }
}

# 🔹 Storage for loaded data
vectorizers = {}
vectors = {}
dfs = {}

# 🔹 Load all datasets
for name, info in datasets_info.items():
    try:
        df = pd.read_csv(info["path"])
        df.columns = [c.lower().strip() for c in df.columns]
        dfs[name] = df
        vectorizer = TfidfVectorizer(stop_words="english")
        vec = vectorizer.fit_transform(df[info["text_col"]].astype(str))
        vectorizers[name] = vectorizer
        vectors[name] = vec
        print(f"✅ Loaded dataset {name}")
    except Exception as e:
        print(f"⚠️ Error loading {name}: {e}")

def get_bot_reply(user_message):
    best_score = 0
    best_dataset = None
    best_idx = None

    # 🔹 Compute similarities across all datasets
    for name, vec in vectors.items():
        user_vector = vectorizers[name].transform([user_message])
        similarities = cosine_similarity(user_vector, vec)
        max_sim = similarities.max()
        if max_sim > best_score:
            best_score = max_sim
            best_dataset = name
            best_idx = similarities.argmax()

    # 🔹 If no good match, return default
    if best_score < 0.25:
        return "I couldn't find a close match in our knowledge base. Can you rephrase your question?"

    # 🔹 Get the answer from the best dataset
    df = dfs[best_dataset]
    info = datasets_info[best_dataset]
    answer = df.iloc[best_idx][info["answer_col"]]
    response = info["response_template"].format(answer)

    return response
