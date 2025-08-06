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

  country.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${fullCountryName}`;

  weather_temp_number_left.firstChild.nodeValue = temp_c;

  weather_temp_conditions.innerText = text;

  weather_icon.src = icon;

  temp_min_value.innerText = mintemp_c;
  temp_max_value.innerText = maxtemp_c;
  initialize_weather_conditions(forecastday);
  initialize_upcoming_days(forecastday);
}

export function initialize_right_data(forecastday) {
  const hourly_forecast_list = document.querySelector(".hourly_forecast_list");

  hourly_forecast_list.innerHTML = "";

  const hourly = forecastday[0].hour;

  const { min_hourly, max_hourly } = get_hourly_forecast_index();

  for (let i = min_hourly; i <= max_hourly; i++) {
    /**
     * i <24 alors 1 % 24 = i
     * i = 24 alors i % 24 = , ainsi de suite
     */
    const index = i % 24; // Boucle sur 24 heures max

    let { text, icon } = hourly[index].condition;

    const hourly_forecast_item = document.createElement("div");
    hourly_forecast_item.className = "hourly_forecast_item";

    const hourly_forecast_item_icon = document.createElement("img");
    hourly_forecast_item_icon.className = "hourly_forecast_item_icon";
    hourly_forecast_item_icon.src = icon;

    const hourly_forecast_item_hour = document.createElement("div");
    hourly_forecast_item_hour.className = "hourly_forecast_item_hour";
    hourly_forecast_item_hour.textContent = index + ":00";

    const hourly_forecast_item_temp = document.createElement("div");
    hourly_forecast_item_temp.className = "hourly_forecast_item_temp";
    hourly_forecast_item_temp.textContent = hourly[index].temp_c + "°";

    const hourly_forecast_item_cond = document.createElement("div");
    hourly_forecast_item_cond.className = "hourly_forecast_item_cond";
    hourly_forecast_item_cond.textContent = text;

    hourly_forecast_list.appendChild(hourly_forecast_item);
    hourly_forecast_item.appendChild(hourly_forecast_item_hour);
    hourly_forecast_item.appendChild(hourly_forecast_item_icon);
    hourly_forecast_item.appendChild(hourly_forecast_item_temp);
    hourly_forecast_item.appendChild(hourly_forecast_item_cond);
  }
}

function get_hourly_forecast_index() {
  const date = new Date(); // Exemple : 2025-08-05T08:15:00
  const heure = date.getHours();

  const min_hourly = heure + 1;
  const max_hourly = heure + 8;

  return {
    min_hourly,
    max_hourly,
  };
}

function initialize_upcoming_days(forecastday) {
  console.log(forecastday);

  const daily_forecast_list = document.querySelector(".daily_forecast_list");

  daily_forecast_list.innerHTML = "";

  const daysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i = 1; i <= 3; i++) {
    const { date, day } = forecastday[i];

    const { text, icon } = day.condition;

    const { daily_chance_of_rain } = day;

    const newDate = new Date(date);

    const day_title = daysArray[newDate.getDay()];

    const daily_forecast_item = document.createElement("div");
    daily_forecast_item.className = "daily_forecast_item";

    const daily_forecast_item_date = document.createElement("div");
    daily_forecast_item_date.className = "daily_forecast_item_date";
    daily_forecast_item_date.textContent = day_title;

    const daily_forecast_item_icon = document.createElement("img");
    daily_forecast_item_icon.className = "daily_forecast_item_icon";
    daily_forecast_item_icon.src = icon;

    const daily_forecast_item_conditions = document.createElement("div");
    daily_forecast_item_conditions.className = "daily_forecast_item_conditions";
    daily_forecast_item_conditions.textContent = text;

    const daily_forecast_item_weather = document.createElement("div");
    daily_forecast_item_weather.className = "daily_forecast_item_weather";

    const daily_forecast_rain = document.createElement("span");
    daily_forecast_rain.className = "daily_forecast_rain";
    daily_forecast_rain.textContent = `Chance of rain : ${daily_chance_of_rain}%`;

    daily_forecast_list.appendChild(daily_forecast_item);

    daily_forecast_item.appendChild(daily_forecast_item_date);
    daily_forecast_item.appendChild(daily_forecast_item_icon);
    daily_forecast_item.appendChild(daily_forecast_item_conditions);
    daily_forecast_item.appendChild(daily_forecast_item_weather);

    daily_forecast_item_weather.appendChild(daily_forecast_rain);
  }
}

function initialize_weather_conditions(forecastday) {
  const conditions_list = document.querySelector(".conditions_list");

  conditions_list.innerHTML = "";

  const { sunrise, sunset } = forecastday[0].astro;
  const { daily_chance_of_rain } = forecastday[0].day;

  for (let i = 0; i <= 2; i++) {
    const conditions_item = document.createElement("div");
    conditions_item.className = "conditions_item";

    const conditions_item_icon = document.createElement("div");
    conditions_item_icon.className = "conditions_item_icon";

    const conditions_item_icon_i = document.createElement("i");

    const conditions_item_right = document.createElement("div");
    conditions_item_right.className = "conditions_item_right";

    const conditions_item_right_title = document.createElement("div");
    conditions_item_right_title.className = "conditions_item_right_title";

    const conditions_item_right_value = document.createElement("div");
    conditions_item_right_value.className = "conditions_item_right_value";

    conditions_list.appendChild(conditions_item);

    conditions_item.appendChild(conditions_item_icon);
    conditions_item_icon.appendChild(conditions_item_icon_i);

    conditions_item.appendChild(conditions_item_right);
    conditions_item_right.appendChild(conditions_item_right_title);
    conditions_item_right.appendChild(conditions_item_right_value);

    switch (i) {
      case 0:
        conditions_item_icon_i.className = "fa-solid fa-cloud-rain";
        conditions_item_right_title.textContent = "Chance of Rain";
        conditions_item_right_value.textContent = daily_chance_of_rain + "%";
        break;
      case 1:
        conditions_item_icon_i.className = "fa-solid fa-sun";
        conditions_item_right_title.textContent = "Sunrise";
        conditions_item_right_value.textContent = sunrise;
        break;
      case 2:
        conditions_item_icon_i.className = "fa-solid fa-cloud-sun";
        conditions_item_right_title.textContent = "Sunset";
        conditions_item_right_value.textContent = sunset;
    }
  }
}
