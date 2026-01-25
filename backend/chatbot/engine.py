from chatbot.rules import RULES

def get_bot_reply(message: str) -> str:
    message = message.lower()

    for rule in RULES:
        for keyword in rule["keywords"]:
            if keyword in message:
                return rule["response"]

    return "I can help with stress, sleep, exercise, and diet 🌿"
