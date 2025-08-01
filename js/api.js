document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "6aceb1066fce41cfac1172926250108";

  let city = "triolet";

  async function get_weather_data(city, apiKey) {
    try {
      const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

      const response = await fetch(apiUrl, { mode: "cors" });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const { location, current, forecast } = data;

      const { name, region, country } = location;

      const { temp_c, condition, humidity } = current;

      const { text, icon } = condition;

      const { forecastday } = forecast;

      forecastday.forEach((day) => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        
        const maxTemp = day.day.maxtemp_c;
        const minTemp = day.day.mintemp_c;
        
        const conditionText = day.day.condition.text;
        const conditionIcon = day.day.condition.icon;
      });
    } catch (error) {
      alert(`Error fetching weather data: ${error.message}`);
    }
  }

  get_weather_data(city, apiKey);
});
