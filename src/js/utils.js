// Function to update the wind direction icon
function updateWindIcon(windDirection) {
  const windIconElement = document.querySelector(".wind-direction-icon");

  const windDirectionMap = {
    N: "north",
    NNE: "north_east",
    NE: "north_east",
    ENE: "north_east",
    E: "east",
    ESE: "south_east",
    SE: "south_east",
    SSE: "south_east",
    S: "south",
    SSW: "south_west",
    SW: "south_west",
    WSW: "south_west",
    W: "west",
    WNW: "north_weast",
    NW: "north_weast",
    NNW: "north_weast",
  };

  const svgPath = `../src/assets/wind/${windDirectionMap[windDirection]}.svg`;
  windIconElement.style.backgroundImage = `url('${svgPath}')`;
}

function updateWeatherIcon(code, isDay) {
  const weatherIcon = document.querySelector(".weather-icon");
  let imgSource;

  switch (code) {
    case 1000:
      imgSource = isDay === 1 ? "sunny" : "clear";
      break;
    case 1003:
      imgSource = isDay === 1 ? "partly-cloudy-day" : "cloudy-night";
      break;
    case 1006:
    case 1009:
    case 1264:
    case 1261:
    case 1237:
    case 1030:
    case 1147:
    case 1135:
    case 1252:
    case 1249:
    case 1207:
    case 1204:
    case 1069:
      imgSource = "cloud";
      break;
    case 1240:
    case 1198:
    case 1186:
    case 1183:
    case 1180:
    case 1171:
    case 1168:
    case 1153:
    case 1150:
    case 1072:
    case 1063:
      imgSource = isDay === 1 ? "rain-cloud-day" : "rain-cloud-night";
      break;
    case 1282:
    case 1279:
    case 1258:
    case 1255:
    case 1222:
    case 1219:
    case 1216:
    case 1213:
    case 1210:
    case 1114:
    case 1066:
    case 1117:
    case 1225:
      imgSource = "snow";
      break;

    case 1276:
    case 1273:
    case 1087:
      imgSource = "storm";
      break;
    case 1243:
    case 1201:
    case 1192:
    case 1189:
    case 1246:
    case 1195:
      imgSource = "rain";
      break;
    default:
      imgSource = "thermometer";
      break;
  }

  weatherIcon.src = `../src/assets/weather/${imgSource}.svg`;
}

export { updateWindIcon, updateWeatherIcon };
