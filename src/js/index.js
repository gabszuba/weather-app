import "../style/style.css";
import { parse, format } from "date-fns";
import { updateWindIcon, updateWeatherIcon } from "./utils";
import getWeatherData from "./dataController";

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

    unitsIndicator.textContent = toggleUnits.classList.contains("active")
      ? "°F"
      : "°C";
    temperatureElement.textContent = toggleUnits.classList.contains("active")
      ? `${weatherDataObject.tempF}°F`
      : `${weatherDataObject.tempC}°C`;
    feelsLikeElement.textContent = toggleUnits.classList.contains("active")
      ? `${weatherDataObject.feelsLikeF}°F`
      : `${weatherDataObject.feelsLikeC}°C`;
    maxTempElement.textContent = toggleUnits.classList.contains("active")
      ? `${weatherDataObject.maxTempF}°F`
      : `${weatherDataObject.maxTempC}°C`;
    minTempElement.textContent = toggleUnits.classList.contains("active")
      ? `${weatherDataObject.minTempF}°F`
      : `${weatherDataObject.minTempC}°C`;
    windSpeedElement.textContent = toggleUnits.classList.contains("active")
      ? `${weatherDataObject.windMph} (Mph)`
      : `${weatherDataObject.windKph} (Kph)`;
  }

  async function renderWeatherData() {
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
    const formattedDate = format(inputDate, "dd MMMM yyyy HH.mm");

    regionElement.textContent = `${weatherDataObject.city}, ${weatherDataObject.region}`;
    countryElement.textContent = weatherDataObject.country;
    localTimeElement.textContent = formattedDate;
    conditionElement.textContent = weatherDataObject.condition;
    windDirectionElement.textContent = weatherDataObject.windDirection;
    humidityElement.textContent = `${weatherDataObject.humidity}%`;
    rainElement.textContent = `${weatherDataObject.chanceOfRain}%`;

    updateTemperatureElements(
      weatherDataObject,
    );

    updateWeatherIcon(weatherDataObject.code, weatherDataObject.isDay);
    updateWindIcon(weatherDataObject.windDirection);
  }

  async function setWeatherDataObject(localization) {
    weatherDataObject = await getWeatherData(localization);
    renderWeatherData();
  }

  async function changeUnits() {
    updateTemperatureElements(weatherDataObject, toggleUnits.querySelector(".indicator"));
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

weatherView.setWeatherDataObject("Montreal");
