from datetime import datetime

BADGES = [
    {"days": 3, "name": "🌱 Starter", "freeze": 0},
    {"days": 7, "name": "💪 Consistent Visitor", "freeze": 1},
    {"days": 14, "name": "🧠 Habit Builder", "freeze": 2},
    {"days": 30, "name": "🏆 Wellnest Regular", "freeze": 3}
]

def update_visit_streak(user):
    today = datetime.utcnow()  # ✅ FIXED

    streak = user.get("streak", {})
    last_visit = streak.get("lastVisit")
    current = streak.get("current", 0)
    longest = streak.get("longest", 0)
    freeze_available = streak.get("freezeAvailable", 0)

    badges = set(user.get("badges", []))

    if not last_visit:
        current = 1
    else:
        days_gap = (today.date() - last_visit.date()).days

        if days_gap == 1:
            current += 1
        elif days_gap > 1:
            if freeze_available > 0:
                freeze_available -= 1
            else:
                current = 1

    longest = max(longest, current)

    for badge in BADGES:
        if current >= badge["days"] and badge["name"] not in badges:
            badges.add(badge["name"])
            freeze_available += badge["freeze"]

    return {
        "streak": {
            "current": current,
            "longest": longest,
            "lastVisit": today,   # ✅ datetime, not date
            "freezeAvailable": freeze_available
        },
        "badges": list(badges)
    }
