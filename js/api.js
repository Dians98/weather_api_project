import { initialize_left_data, initialize_right_data } from "../js/utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "6aceb1066fce41cfac1172926250108";

  let city = "trou aux biches";

  const search_btn = document.querySelector(".search_div");
  let city_input = document.querySelector(".search input");

  city_input.addEventListener("input", function () {
    if (city_input.value.trim() !== "") {
      search_btn.classList.remove("disabled");
    } else {
      search_btn.classList.add("disabled");
    }
  });

  search_btn.addEventListener("click", function () {
    if (city_input.value != "") {
      get_weather_data(city_input.value, apiKey);
    }
  });

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

      const fullCountryName = `${name}, ${country}`;

      const { forecastday } = forecast;

      initialize_left_data(fullCountryName, current, forecastday);

      initialize_right_data(forecastday)

      forecastday.forEach((day) => {
        const date = new Date(day.date);

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
