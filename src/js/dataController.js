import { fetchCurrentWeatherData, processCurrentWeatherData } from "./api";

// Returns the processed data object to the frontend
async function getWeatherData(localization) {
  try {
    const weatherData = await fetchCurrentWeatherData(localization);
    const processedData = processCurrentWeatherData(weatherData);
    return processedData;
  } catch (error) {
    console.error("Error:", error.message);
    return error.message;
  }
}

export default getWeatherData;
