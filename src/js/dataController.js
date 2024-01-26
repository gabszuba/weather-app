import { fetchCurrentWeatherData, processCurrentWeatherData, fetchUserCity } from "./api";

// Returns the processed data object to the frontend
async function getWeatherData(localization) {
  try {
    const weatherData = await fetchCurrentWeatherData(localization);
    const processedData = processCurrentWeatherData(weatherData);
    return processedData;
  } catch (error) {
    return error.message;
  }
}

async function getCity() {
  try {
    const localization = await fetchUserCity();
    return await localization.location.city;
  } catch (error) {
    console.log("An error occurred while getting the location.");
    return null;
  }
}

export { getCity, getWeatherData };
