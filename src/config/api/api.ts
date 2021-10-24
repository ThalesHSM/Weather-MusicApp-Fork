import { doc, setDoc } from "@firebase/firestore";
import axios from "axios";
import { IWeatherMusic } from "../../context/WeatherContext";
import { db } from "../Firebase/Firebase";

interface IMusicFirebase {
  newItem: IWeatherMusic;
}

async function HandleSetFirebaseItems(
  musicFirebase: IMusicFirebase[],
  userId: string
) {
  if (userId) {
    if (musicFirebase && musicFirebase !== null) {
      try {
        const musicRef = doc(db, "musics", userId);

        await setDoc(musicRef, { musicFirebase });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

async function HandleRemoveFirebaseItem(
  musicFirebase: IWeatherMusic[],
  userId: string
) {
  try {
    const musicRef = doc(db, "musics", userId);
    await setDoc(musicRef, { musicFirebase });
  } catch (error) {
    console.log(error);
  }
}

async function handleTemperature(locationWoeid: number) {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://www.metaweather.com/api/location/${locationWoeid}`
    )}`
  );

  const getWeather = await JSON.parse(response.data["contents"]);

  return getWeather;
}

async function handleLocationName(locationName: string) {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://www.metaweather.com/api/location/search/?query=${locationName}`
    )}`
  );
  const getWeather = await JSON.parse(response.data["contents"]);

  return getWeather;
}

async function handleMusic(musicStyle: string) {
  try {
    const response = await axios.get("https://shazam.p.rapidapi.com/search", {
      headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "7f628bb505mshd79561989e6bf82p19fcdajsne7b7b6dcc481",
      },
      params: {
        term: musicStyle,
        offset: "0",
        limit: "5",
      },
    });
    return response.data["tracks"]["hits"];
  } catch (error) {
    console.log(error);
  }
}

export {
  HandleSetFirebaseItems,
  HandleRemoveFirebaseItem,
  handleTemperature,
  handleLocationName,
  handleMusic,
};
