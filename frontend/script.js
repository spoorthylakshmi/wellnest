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
