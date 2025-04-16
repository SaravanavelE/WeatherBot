import requests
API_KEY = "1927af2fcebadda6c9988d5a9b6f8123"
def get_weather(location):
    geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={location}&limit=1&appid={API_KEY}"
    geo_res = requests.get(geo_url).json()
    if not geo_res:
        print("❌ Sorry, I couldn't find that location.")
        return
    lat = geo_res[0]['lat']
    lon = geo_res[0]['lon']
    city = geo_res[0]['name']
    state = geo_res[0].get('state', '')
    country = geo_res[0].get('country', '')
    weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    res = requests.get(weather_url).json()
    temp = f"{res['main']['temp']}°C"
    humidity = f"{res['main']['humidity']}%"
    wind = f"{res['wind']['speed']}m/s"
    condition = res['weather'][0]['description']

    print("\n🌦️ Here's the weather update:")
    print(f"📍 Location: {city}, {state if state else country}")
    print(f"🌡️ Temperature: {temp}")
    print(f"💧 Humidity: {humidity}")
    print(f"🌬️ Wind Speed: {wind}")
    print(f"☁️ Weather Condition: {condition}")
def weather_chatbot():
    print("🤖 Hi! I can tell you the current weather. Type a location or say 'bye' to exit.")
    while True:
        location = input("📍 Enter location: ")
        if location.lower() == "bye":
            print("👋 Bye! Stay safe and check the skies 🌤️")
            break
        get_weather(location)

weather_chatbot()
