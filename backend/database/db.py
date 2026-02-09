from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["wellnest"]

users = db["users"]
daily_logs = db["daily_logs"]
