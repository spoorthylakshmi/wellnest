async function analyzeEmotion() {
  const userInput = document.getElementById("userText").value;
  
  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: userInput })
  });

  const result = await response.json();
  document.getElementById("result").innerText =
    `Emotion: ${result.emotion.toUpperCase()} 😄`;
}

document.addEventListener("DOMContentLoaded", () => {
  const moodCards = document.querySelectorAll(".mood-card");
  const moodMessage = document.getElementById("mood-message");
  const quoteDisplay = document.getElementById("quoteDisplay");
  
  const moodQuotes = {
    angry: "Holding on to anger is like grasping a hot coal... - Buddha",
    sad: "The word 'happy' would lose its meaning if not balanced by sadness. - Carl Jung",
    neutral: "Peace comes from within. Do not seek it without. - Buddha",
    excited: "Follow your excitement; it will lead you home every time. - Abraham Hicks",
    happy: "Happiness is not something ready made. It comes from your own actions. - Dalai Lama",
    
  };
  
  const moodValues = { angry: 1, sad: 2, neutral: 3, happy: 4, excited: 5 };

  moodCards.forEach(card => {
    card.addEventListener("click", () => {
      // Remove previous selection styling
      moodCards.forEach(c => {
        c.style.borderColor = '#e3f2fd';
        c.style.transform = 'none';
      });

      // Mark current selection
      const selectedMood = card.dataset.mood;
      card.style.borderColor = '#4caf50';
      card.style.transform = 'scale(1.05)';
      
      // Show quote
      quoteDisplay.textContent = moodQuotes[selectedMood];
      quoteDisplay.classList.add('show');
      
      // Update message
      moodMessage.textContent = `You selected: ${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}`;
      
      // Update mood input for chart (1-5 scale)
      const moodInput = document.getElementById('mood');
      if (moodInput) {
        moodInput.value = moodValues[selectedMood];
      }
      
      // Save to localStorage (backwards compatible)
      localStorage.setItem("todayMood", selectedMood);
    });
  });
});
