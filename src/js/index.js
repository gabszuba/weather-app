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
  let userCity = await getUserCity();
  if (!userCity) userCity = "Montreal";

  weatherView.setWeatherDataObject(userCity);
}

main();
