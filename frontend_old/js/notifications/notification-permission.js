// Ask the browser for notification permission
function requestNotificationPermission() {

  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("Your browser does not support notifications.");
    return;
  }

  // Ask the user for permission
  Notification.requestPermission().then(function (permission) {

    // Save user's choice so we remember it
    localStorage.setItem("notificationPermission", permission);

    if (permission === "granted") {
      console.log("Notification permission granted");
    } else if (permission === "denied") {
      console.log("Notification permission denied");
    } else {
      console.log("Notification permission dismissed");
    }
  });
}

// Get saved permission from localStorage
function getSavedNotificationPermission() {
  return localStorage.getItem("notificationPermission");
}
