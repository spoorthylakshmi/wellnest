import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
import joblib

# Paths
data_dir = os.path.join(os.path.dirname(__file__), '../dataset')
model_dir = os.path.join(os.path.dirname(__file__), '../models')
os.makedirs(model_dir, exist_ok=True)

dataset_path = os.path.join(data_dir, 'merged_dataset.csv')
model_path = os.path.join(model_dir, 'emotion_model.pkl')
vectorizer_path = os.path.join(model_dir, 'vectorizer.pkl')

# Load dataset
df = pd.read_csv(dataset_path)
print(f"✅ Loaded dataset with {len(df)} rows")

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    df['text'], df['label'], test_size=0.2, random_state=42
)

# Vectorize text
vectorizer = TfidfVectorizer(max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_train_vec, y_train)

# Evaluate
y_pred = model.predict(X_test_vec)
acc = accuracy_score(y_test, y_pred)
print(f"🎯 Accuracy: {acc:.2f}")
print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))

# Save model and vectorizer
joblib.dump(model, model_path)
joblib.dump(vectorizer, vectorizer_path)
print(f"\n✅ Model saved to: {model_path}")
print(f"✅ Vectorizer saved to: {vectorizer_path}")
