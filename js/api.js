document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "TDMS8VZU7LT5CXNR4GDRVNJP8";
  let city = "mauritius";

  async function get_weather_data(city, apiKey) {
    try {
      const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`;

      const response = await fetch(apiUrl, { mode: "cors" });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const { timezone, latitude, currentConditions } = data;

      
    } catch (error) {
      alert(`Error fetching weather data: ${error.message}`);
    }
  }

  get_weather_data(city, apiKey);
});
