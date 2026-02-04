let notificationsStarted = false;

// Show a single notification
function showNotification(title, message) {
  if (Notification.permission !== "granted") return;

  new Notification(title, {
    body: message,
    icon: "ai.jpg" // you already have this image
  });
}

// Start all wellness notifications
function startWellnessNotifications() {
    if (notificationsStarted) return;
    notificationsStarted = true;


  // 💧 Water reminder every 1 hour
  setInterval(() => {
    const msg =
      waterReminders[Math.floor(Math.random() * waterReminders.length)];
    showNotification("Hydration Reminder 💧", msg);
  }, 60 * 60 * 1000);

  // 🌱 Wellness tip every 4 hours
  setInterval(() => {
    const tip =
      wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
    showNotification("Wellness Tip 🌱", tip);
  }, 4 * 60 * 60 * 1000);

  // ✨ Motivation quote every day
  setInterval(() => {
    const quote =
      wellnessQuotes[Math.floor(Math.random() * wellnessQuotes.length)];
    showNotification("Daily Motivation ✨", quote);
  }, 24 * 60 * 60 * 1000);
}
