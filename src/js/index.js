import weatherView from "./view";
import { getCity } from "./dataController";

async function getUserCity() {
  try {
    const userCity = await getCity();
    return userCity;
  } catch (error) {
    console.log("An error occurred while getting the location.");
    return null;
  }
}

async function main() {
  const userCity = await getUserCity() || "Montreal";
  if (userCity) {
    weatherView.setWeatherDataObject(userCity);
  }
}

main();
