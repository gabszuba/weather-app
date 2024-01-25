// F the data and return it into a json file
async function fetchCurrentWeatherData(localization) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=21b7e09b63264d97b1d150055241901&q=${localization}&days=1&aqi=no&alerts=no`,
      { mode: "cors" },
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

// Returns the WeatherObject
function processCurrentWeatherData(data) {
  try {
    return {
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
    };
  } catch (error) {
    console.error("Error processing weather data:", error);
    throw error;
  }
}

export { fetchCurrentWeatherData, processCurrentWeatherData };
