const API_KEY = "1927af2fcebadda6c9988d5a9b6f8123";
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender === "You" ? "user-message" : "bot-message";
  msg.innerHTML = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getWeather(location) {
  try {
    const geo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);
    const geoData = await geo.json();

    if (!geoData.length) {
      appendMessage("Bot", `❌ Sorry, I couldn't find "${location}". Try another location.`);
      return;
    }

    const { lat, lon, name, state, country } = geoData[0];
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await res.json();

    const temp = `${data.main.temp}°C`;
    const humidity = `${data.main.humidity}%`;
    const wind = `${data.wind.speed}m/s`;
    const condition = data.weather[0].description;

    appendMessage("Bot", `
      📍 <strong>Location:</strong> ${name}, ${state || country}<br>
      🌡️ <strong>Temperature:</strong> ${temp}<br>
      💧 <strong>Humidity:</strong> ${humidity}<br>
      🌬️ <strong>Wind:</strong> ${wind}<br>
      ☁️ <strong>Condition:</strong> ${condition}
    `);
  } catch (err) {
    appendMessage("Bot", "❌ Error getting weather. Try again later.");
  }
}

function handleInput() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("You", input);
  userInput.value = "";

  if (input.toLowerCase() === "bye") {
    appendMessage("Bot", "👋 Bye boss! Take care and stay weather-ready ☀️🌧️");
    userInput.disabled = true;
    sendBtn.disabled = true;
    return;
  }

  getWeather(input);
}

sendBtn.onclick = handleInput;
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleInput();
});
