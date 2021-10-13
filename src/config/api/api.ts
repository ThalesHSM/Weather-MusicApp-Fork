import axios from "axios";

async function HandleSetStorageItems(music: any) {
  let newArray = [];

  const citiesJSON = await localStorage.getItem("@storage_Key");

  if (citiesJSON === null) {
    newArray = [music];

    const stringifiedArray = JSON.stringify(newArray);

    await localStorage.setItem("@storage_Key", stringifiedArray);

    return;
  }

  if (citiesJSON !== null) {
    newArray = JSON.parse(citiesJSON);
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === music.id && newArray[i].id === music.date) {
        return;
      }
    }
    newArray.push(music);

    const stringifiedArray = JSON.stringify(newArray);

    await localStorage.setItem("@storage_Key", stringifiedArray);
    return;
  }
}

async function HandleRemoveStorageItem(music: any) {
  try {
    const citiesJSON = await localStorage.getItem("@storage_Key");

    if (citiesJSON !== null) {
      let storageArray = JSON.parse(citiesJSON);

      const alteredMusicArray = storageArray.filter(function (e: any) {
        if (e.id === music.id && e.date === music.date) {
          return e.id !== music.id && e.date !== music.date;
        }
        return storageArray;
      });

      localStorage.setItem("@storage_Key", JSON.stringify(alteredMusicArray));
    }
  } catch (error) {
    console.log(error);
  }
}

async function handleTemperature(locationWoeid: any) {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://www.metaweather.com/api/location/${locationWoeid}`
    )}`
  );

  const getWeather = await JSON.parse(response.data["contents"]);

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

async function handleMusic(musicStyle: string) {
  try {
    const response = await axios.get("https://shazam.p.rapidapi.com/search", {
      headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "b27dc01becmsh7a82312cc25826cp184f03jsn505f2ff8f29e",
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
  HandleSetStorageItems,
  HandleRemoveStorageItem,
  handleTemperature,
  handleLocationName,
  handleMusic,
};
