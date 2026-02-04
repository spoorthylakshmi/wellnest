document.addEventListener("DOMContentLoaded", function () {

  const enableBtn = document.getElementById("enableNotificationsBtn");
  const toggleSection = document.getElementById("notificationToggleSection");
  const toggle = document.getElementById("notificationToggle");

  if (!enableBtn) return;

  const savedPermission = getSavedNotificationPermission();
  const enabledPref = localStorage.getItem("notificationsEnabled");

// CASE 1: Permission already granted
if (savedPermission === "granted") {
  enableBtn.style.display = "none";      // ✅ HERE
  toggleSection.style.display = "block";

  if (enabledPref === "true") {
    toggle.checked = true;
    startWellnessNotifications();
  } else {
    toggle.checked = false;
    stopWellnessNotifications();
  }

  return;
}


  // CASE 2: Permission denied earlier
  if (savedPermission === "denied") {
    enableBtn.innerText = "Wellness Notifications Blocked ❌";
    enableBtn.disabled = true;
    return;
  }

  // CASE 3: First-time user
  enableBtn.addEventListener("click", function () {
    requestNotificationPermission();

    setTimeout(() => {
      const permission = Notification.permission;
if (permission === "granted") {
  enableBtn.style.display = "none";      // ✅ HERE
  toggleSection.style.display = "block";

  localStorage.setItem("notificationsEnabled", "true");
  toggle.checked = true;
  startWellnessNotifications();
}


      if (permission === "denied") {
        enableBtn.innerText = "Wellness Notifications Blocked ❌";
        enableBtn.disabled = true;
      }
    }, 500);
  });

  // TOGGLE ON / OFF LOGIC
  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      localStorage.setItem("notificationsEnabled", "true");
      startWellnessNotifications();
    } else {
      localStorage.setItem("notificationsEnabled", "false");
      stopWellnessNotifications();
    }
  });

});
