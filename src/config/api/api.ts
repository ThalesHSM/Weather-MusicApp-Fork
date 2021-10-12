import axios from "axios";

async function handleTemperature(locationWoeid: any) {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://www.metaweather.com/api/location/${locationWoeid}`
    )}`
  );

  const getWeather = await JSON.parse(response.data["contents"]);

  console.log(getWeather);
  return getWeather;
}

async function handleLocationName(locationName: any) {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://www.metaweather.com/api/location/search/?query=${locationName}`
    )}`
  );
  const getWeather = await JSON.parse(response.data["contents"]);

  return getWeather;
}

async function handleMusic() {
  try {
    const response = await axios.get("https://shazam.p.rapidapi.com/search", {
      headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "4d1d2cfb2dmsh599a8dd3663b62cp1662b0jsneeb2c92903ed",
      },
      params: {
        term: "rock",
        offset: "0",
        limit: "5",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { handleTemperature, handleLocationName, handleMusic };
