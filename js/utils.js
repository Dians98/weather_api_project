export function initialize_left_data(fullCountryName, current, forecastday) {
  const country = document.querySelector(".country");

  const weather_icon = document.querySelector(".weather_icon img");

  const weather_temp_number_left = document.querySelector(
    ".weather_temp_number_left"
  );

  const temp_min_value = document.querySelector(".temp_min_value");

  const temp_max_value = document.querySelector(".temp_max_value");

  const weather_temp_conditions = document.querySelector(
    ".weather_temp_conditions"
  );

  const { temp_c, humidity } = current;

  const { maxtemp_c, mintemp_c, daily_chance_of_rain, condition } =
    forecastday[0].day;

  const { text, icon } = condition;

  country.innerText = fullCountryName;

  weather_temp_number_left.firstChild.nodeValue = temp_c;

  weather_temp_conditions.innerText = text;

  weather_icon.src = icon;

  temp_min_value.innerText = mintemp_c;
  temp_max_value.innerText = maxtemp_c;
}
