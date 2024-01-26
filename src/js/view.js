import "../style/style.css";
import { parse, format } from "date-fns";
import { updateWindIcon, updateWeatherIcon, updateForecast } from "./utils";
import { getWeatherData } from "./dataController";

const weatherView = (() => {
  const searchBox = document.querySelector(".search-box");
  const searchButton = document.querySelector(".search-button");
  const toggleUnits = document.querySelector(".toggle-units");
  let weatherDataObject;

  function updateTemperatureElements() {
    const unitsIndicator = document.querySelector(".indicator");
    const temperatureElement = document.querySelector(".temperature");
    const feelsLikeElement = document.querySelector(".feels-like");
    const windSpeedElement = document.querySelector(".wind-speed");
    const maxTempElement = document.querySelector(".max-temp");
    const minTempElement = document.querySelector(".min-temp");
    const forecastAvgTempElements = [...document.querySelectorAll(".forecast-avg-temp")];
    const forecastMinTempElements = [...document.querySelectorAll(".forecast-min-temp")];
    const forecastMaxTempElements = [...document.querySelectorAll(".forecast-max-temp")];
    const { forecast } = weatherDataObject;

    if (toggleUnits.classList.contains("active")) {
      unitsIndicator.textContent = "°F";
      temperatureElement.textContent = `${weatherDataObject.tempF}°F`;
      feelsLikeElement.textContent = `${weatherDataObject.feelsLikeF}°F`;
      maxTempElement.textContent = `${weatherDataObject.maxTempF}°F`;
      minTempElement.textContent = `${weatherDataObject.minTempF}°F`;
      windSpeedElement.textContent = `${weatherDataObject.windMph} (Mph)`;
      forecast.forEach((day, index) => {
        forecastAvgTempElements[index].textContent = `${day.avgTempC}°F `;
        forecastMinTempElements[index].textContent = `Min: ${day.minTempF}°F`;
        forecastMaxTempElements[index].textContent = `Max: ${day.maxTempF}°F`;
      });
      return;
    }

    unitsIndicator.textContent = "°C";
    temperatureElement.textContent = `${weatherDataObject.tempC}°C`;
    feelsLikeElement.textContent = `${weatherDataObject.feelsLikeC}°C`;
    maxTempElement.textContent = `${weatherDataObject.maxTempC}°C`;
    minTempElement.textContent = `${weatherDataObject.minTempC}°C`;
    windSpeedElement.textContent = `${weatherDataObject.windKph} (Kph)`;
    forecast.forEach((day, index) => {
      forecastAvgTempElements[index].textContent = `${day.avgTempF}°C`;
      forecastMinTempElements[index].textContent = `Min: ${day.minTempC}°C`;
      forecastMaxTempElements[index].textContent = `Max: ${day.maxTempC}°C`;
    });
  }

  function displayErrorMessage() {
    const header = document.querySelector("header");
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error-msg");
    errorDiv.textContent = "City not found, please insert a valid paramether, such as latitude or longitude, city name, US, UK and Canada postcode";
    header.appendChild(errorDiv);
  }

  function removeErrorMessage() {
    const errorMsg = document.querySelector(".error-msg");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
  async function renderWeatherData() {
    removeErrorMessage();

    const regionElement = document.querySelector(".city-region");
    const countryElement = document.querySelector(".country");
    const localTimeElement = document.querySelector(".localTime");
    const conditionElement = document.querySelector(".condition");
    const windDirectionElement = document.querySelector(".wind-direction");
    const humidityElement = document.querySelector(".humidity");
    const rainElement = document.querySelector(".chance-rain");

    const inputDate = parse(
      weatherDataObject.localTime,
      "yyyy-MM-dd HH:mm",
      new Date(),
    );
    const formattedDate = format(inputDate, "dd MMMM yyyy HH:mm");

    regionElement.textContent = `${weatherDataObject.city}, ${weatherDataObject.region}`;
    countryElement.textContent = weatherDataObject.country;
    localTimeElement.textContent = formattedDate;
    conditionElement.textContent = weatherDataObject.condition;
    windDirectionElement.textContent = weatherDataObject.windDirection;
    humidityElement.textContent = `${weatherDataObject.humidity}%`;
    rainElement.textContent = `${weatherDataObject.chanceOfRain}%`;

    updateTemperatureElements();

    updateForecast(weatherDataObject.forecast);
    const weatherIcon = document.querySelector(".weather-icon");
    const imgSource = updateWeatherIcon(weatherDataObject.code, weatherDataObject.isDay);
    weatherIcon.src = `../src/assets/weather/${imgSource}.svg`;
    updateWindIcon(weatherDataObject.windDirection);
  }

  async function setWeatherDataObject(localization) {
    const main = document.querySelector("main");
    const spin = document.querySelector(".square-spin");
    main.style.display = "none";
    spin.style.display = "block";

    try {
      weatherDataObject = await getWeatherData(localization);
      await renderWeatherData();
      main.style.display = "block";
    } catch (error) {
      displayErrorMessage();
    } finally {
      spin.style.display = "none";
    }
  }

  function changeUnits() {
    updateTemperatureElements();
  }

  function handleSearchEvent() {
    const localization = searchBox.value;
    if (localization) {
      setWeatherDataObject(localization);
    }
  }

  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSearchEvent();
    }
  });

  searchButton.addEventListener("click", () => {
    handleSearchEvent();
  });

  toggleUnits.addEventListener("click", () => {
    toggleUnits.classList.toggle("active");
    changeUnits();
  });

  return {
    setWeatherDataObject,
  };
})();

export default weatherView;
