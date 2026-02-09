import pandas as pd
import os
from .rules import RULES

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 🔹 Go to project root (wellnest)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# 🔹 Emotion label mapping (FIXES "feeling 0")
EMOTION_MAP = {
    0: "sadness",
    1: "happiness",
    2: "anger",
    3: "fear",
    4: "neutral"
}

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

# 🔹 Storage
vectorizers = {}
vectors = {}
dfs = {}

print("🔄 Loading chatbot datasets...\n")

# 🔹 Load datasets
for name, info in datasets_info.items():
    try:
        df = pd.read_csv(info["path"])
        df.columns = [c.lower().strip() for c in df.columns]

        text_col = info["text_col"].lower()
        answer_col = info["answer_col"].lower()

        if text_col not in df.columns or answer_col not in df.columns:
            raise ValueError(
                f"Missing columns. Found {df.columns.tolist()}, "
                f"expected '{text_col}' and '{answer_col}'"
            )

        vectorizer = TfidfVectorizer(stop_words="english")
        vec = vectorizer.fit_transform(df[text_col].astype(str))

        dfs[name] = df
        vectorizers[name] = vectorizer
        vectors[name] = vec

        print(f"✅ Loaded {name} dataset ({len(df)} rows)")

    except Exception as e:
        print(f"❌ Failed to load {name}: {e}")

print("\n🚀 Chatbot engine ready.\n")

# 🔹 Trim long FAQ answers (UX FIX)
def trim_answer(text, max_length=350):
    text = str(text)
    if len(text) > max_length:
        return text[:max_length] + "..."
    return text

# 🔹 Rule-based response
def rule_based_reply(user_message: str):
    msg = user_message.lower()

    # Skip rules for definition questions
    if msg.startswith("what is") or msg.startswith("define"):
        return None

    for rule in RULES:
        for keyword in rule["keywords"]:
            if keyword in msg:
                return rule["response"]

    return None

# 🔹 Main chatbot function
def get_bot_reply(user_message: str) -> str:
    # STEP 1: Rule-based check
    rule_response = rule_based_reply(user_message)
    if rule_response:
        return rule_response

    # STEP 2: ML-based similarity search
    best_score = 0
    best_dataset = None
    best_idx = None

    for name, vec in vectors.items():
        user_vector = vectorizers[name].transform([user_message])
        similarities = cosine_similarity(user_vector, vec)
        max_sim = similarities.max()

        # Dataset priority
        if name == "faq":
            max_sim *= 1.3
        elif name == "emotion":
            max_sim *= 1.1

        if max_sim > best_score:
            best_score = max_sim
            best_dataset = name
            best_idx = similarities.argmax()

    if best_dataset is None or best_score < 0.10:
        return "I’m here to listen. Can you tell me more about how you’re feeling?"

    df = dfs[best_dataset]
    info = datasets_info[best_dataset]
    answer = df.iloc[best_idx][info["answer_col"].lower()]

    # 🔹 Emotion label mapping
    if best_dataset == "emotion":
        answer = EMOTION_MAP.get(answer, "something difficult")

    # 🔹 Trim long FAQ answers
    if best_dataset == "faq":
        answer = trim_answer(answer)

    return info["response_template"].format(answer)

# 🔹 Console testing
if __name__ == "__main__":
    print("💬 Chatbot console mode (Ctrl+C to exit)\n")
    while True:
        user_input = input("You: ")
        print("Bot:", get_bot_reply(user_input))
