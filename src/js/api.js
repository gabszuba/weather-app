// F the data and return it into a json file
async function fetchCurrentWeatherData(localization) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=21b7e09b63264d97b1d150055241901&q=${localization}&days=3&aqi=no&alerts=no`,
      { mode: "cors" },
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return error.message;
  }
}

// Returns the WeatherObject
function processCurrentWeatherData(data) {
  const forecastData = [];

  for (let i = 0; i <= 2; i += 1) {
    forecastData.push({
      date: data.forecast.forecastday[i].date,
      code: data.forecast.forecastday[i].day.condition.code,
      avgTempC: data.forecast.forecastday[i].day.avgtemp_c,
      avgTempF: data.forecast.forecastday[i].day.avgtemp_f,
      maxTempC: data.forecast.forecastday[i].day.maxtemp_c,
      maxTempF: data.forecast.forecastday[i].day.maxtemp_f,
      minTempC: data.forecast.forecastday[i].day.mintemp_c,
      minTempF: data.forecast.forecastday[i].day.mintemp_f,
    });
  }

  const processedData = {
    city: data.location.name,
    region: data.location.region,
    country: data.location.country,
    feelsLikeC: data.current.feelslike_c,
    feelsLikeF: data.current.feelslike_f,
    windKph: data.current.wind_kph,
    windMph: data.current.wind_mph,
    tempC: data.current.temp_c,
    tempF: data.current.temp_f,
    windDirection: data.current.wind_dir,
    condition: data.current.condition.text,
    code: data.current.condition.code,
    localTime: data.location.localtime,
    humidity: data.current.humidity,
    isDay: data.current.is_day,
    maxTempC: data.forecast.forecastday[0].day.maxtemp_c,
    maxTempF: data.forecast.forecastday[0].day.maxtemp_f,
    minTempC: data.forecast.forecastday[0].day.mintemp_c,
    minTempF: data.forecast.forecastday[0].day.mintemp_f,
    chanceOfRain: data.forecast.forecastday[0].day.daily_chance_of_rain,
    forecast: forecastData,
  };

  return processedData;
}

async function fetchUserCity() {
  try {
    const response = await fetch(
      "https://geo.ipify.org/api/v2/country,city?apiKey=at_KbTNQGg4YshyxpdV6DpVF0WGtC9nU&ipAddress=",
      { mode: "cors" },
    );
    return await response.json();
  } catch (error) {
    return error.message;
  }
}

export { fetchCurrentWeatherData, processCurrentWeatherData, fetchUserCity };
