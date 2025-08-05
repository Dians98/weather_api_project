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

export function initialize_right_data(forecastday) {
  const hourly_forecast_list = document.querySelector(".hourly_forecast_list")

  hourly_forecast_list.innerHTML = ""


  const hourly = forecastday[0].hour

  console.log(hourly);


  const { min_hourly, max_hourly } = get_hourly_forecast_index()



  for (let i = min_hourly; i <= max_hourly; i++) {

    let { text, icon } = hourly[i].condition


    const hourly_forecast_item = document.createElement("div")
    hourly_forecast_item.className = "hourly_forecast_item"

    const hourly_forecast_item_icon = document.createElement("img")
    hourly_forecast_item_icon.className = "hourly_forecast_item_icon"
    hourly_forecast_item_icon.src = icon;

    const hourly_forecast_item_hour = document.createElement("div")
    hourly_forecast_item_hour.className = "hourly_forecast_item_hour"
    hourly_forecast_item_hour.textContent = i + ":00";

    const hourly_forecast_item_temp = document.createElement("div");
    hourly_forecast_item_temp.className = "hourly_forecast_item_temp";

    let temp_c = hourly[i].temp_c
    hourly_forecast_item_temp.textContent = temp_c + "°"; // exemple : 20° à 24°

    const hourly_forecast_item_cond = document.createElement("div");
    hourly_forecast_item_cond.className = "hourly_forecast_item_cond";



    hourly_forecast_item_cond.textContent = text; // exemple : 20° à 24°


    hourly_forecast_list.appendChild(hourly_forecast_item)
    hourly_forecast_item.appendChild(hourly_forecast_item_hour)
    hourly_forecast_item.appendChild(hourly_forecast_item_icon)

    hourly_forecast_item.appendChild(hourly_forecast_item_temp)
    hourly_forecast_item.appendChild(hourly_forecast_item_cond)
  }


}

function get_hourly_forecast_index() {
  const date = new Date(); // Exemple : 2025-08-05T08:15:00
  const heure = date.getHours();

  const min_hourly = heure
  const max_hourly = heure + 7

  return {
    min_hourly,
    max_hourly
  };
}


