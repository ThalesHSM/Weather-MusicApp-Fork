import React, { useEffect, useState } from "react";
import { StyledMainDiv } from "./StyledMusic";
import { handleMusic } from "../../config/api/api";
import Colors from "../../utils/colors";
import { Levels } from "react-activity";
import "react-activity/dist/Levels.css";

import { useWeather } from "../../context/WeatherContext";
import MusicCard from "./MusicCard";

interface IMusic {
  temperature: number;
  isCelsius: boolean;
  weather: any;
}

function Music({ temperature, isCelsius, weather }: IMusic) {
  const { weatherMusic, setWeatherMusic } = useWeather();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function music() {
      if (temperature > 32) {
        setIsLoading(true);

        const music = await handleMusic("rock");
        if (music !== undefined) {
          let newArray: any = [];

          for (let i = 0; i < 5; i++) {
            newArray = [
              ...newArray,
              {
                id: music[i]["track"]["key"],
                saved: false,
                cityName: weather.cityName,
                date: weather.date,
                temperature: weather.temperature,
                weatherImage: weather.weatherImage,
                weatherName: weather.weatherName,

                musicAuthor: music[i]["track"]["subtitle"],
                musicCategory: "Rock",
                musicImage: music[i]["track"]["images"]["coverart"],
                musicName: music[i]["track"]["share"]["subject"],
                musicSpotifyLink:
                  music[i]["track"]["hub"]["providers"][0]["actions"][0]["uri"],
                musicShazamLink: music[i]["track"]["url"],
              },
            ];
          }
          setWeatherMusic(newArray);
          console.log(weatherMusic);
          console.log("weatherMusic");
        }
        setIsLoading(false);
      }
      if (temperature < 32 && temperature > 24) {
        setIsLoading(true);
        const music = await handleMusic("pop");
        if (music !== undefined) {
          let newArray: any = [];

          for (let i = 0; i < 5; i++) {
            newArray = [
              ...newArray,
              {
                id: music[i]["track"]["key"],
                saved: false,
                cityName: weather.cityName,
                date: weather.date,
                temperature: weather.temperature,
                weatherImage: weather.weatherImage,
                weatherName: weather.weatherName,

                musicAuthor: music[i]["track"]["subtitle"],
                musicCategory: "Pop",

                musicImage: music[i]["track"]["images"]["coverart"],
                musicName: music[i]["track"]["share"]["subject"],
                musicSpotifyLink:
                  music[i]["track"]["hub"]["providers"][0]["actions"][0]["uri"],
                musicShazamLink: music[i]["track"]["url"],
              },
            ];
          }
          setWeatherMusic(newArray);
          console.log(weatherMusic);
          console.log("weatherMusic");
        }
        setIsLoading(false);
      }
      if (temperature < 24 && temperature > 16) {
        setIsLoading(true);

        const music = await handleMusic("classical");
        console.log(music);
        if (music !== undefined) {
          let newArray: any = [];

          for (let i = 0; i < 5; i++) {
            newArray = [
              ...newArray,
              {
                id: music[i]["track"]["key"],
                saved: false,
                cityName: weather.cityName,
                date: weather.date,
                temperature: weather.temperature,
                weatherImage: weather.weatherImage,
                weatherName: weather.weatherName,

                musicAuthor: music[i]["track"]["subtitle"],
                musicCategory: "Classical",
                musicImage: music[i]["track"]["images"]["coverart"],
                musicName: music[i]["track"]["share"]["subject"],
                musicSpotifyLink:
                  music[i]["track"]["hub"]["providers"][0]["actions"][0]["uri"],
                musicShazamLink: music[i]["track"]["url"],
              },
            ];
          }
          setWeatherMusic(newArray);
          console.log(weatherMusic);
          console.log("weatherMusic");
        }

        setIsLoading(false);
      }
      if (temperature < 16) {
        setIsLoading(true);

        const music = await handleMusic("lofi");
        if (music !== undefined) {
          let newArray: any = [];

          for (let i = 0; i < 5; i++) {
            newArray = [
              ...newArray,
              {
                id: music[i]["track"]["key"],
                saved: false,
                cityName: weather.cityName,
                date: weather.date,
                temperature: weather.temperature,
                weatherImage: weather.weatherImage,
                weatherName: weather.weatherName,

                musicAuthor: music[i]["track"]["subtitle"],
                musicCategory: "Lofi",
                musicImage: music[i]["track"]["images"]["coverart"],
                musicName: music[i]["track"]["share"]["subject"],
                musicSpotifyLink:
                  music[i]["track"]["hub"]["providers"][0]["actions"][0]["uri"],
                musicShazamLink: music[i]["track"]["url"],
              },
            ];
          }
          setWeatherMusic(newArray);
          console.log(weatherMusic);
          console.log("weatherMusic");
        }
        setIsLoading(false);
      }
    }

    music();
  }, [temperature]);

  return (
    <StyledMainDiv>
      {!isLoading && weatherMusic && weatherMusic.length > 0 ? (
        <div
          style={{
            display: "flex",
            color: Colors.white,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {weatherMusic.map((item: any) => (
            <MusicCard item={item} isCelsius={isCelsius} key={item.id} />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: 50,
          }}
        >
          <Levels color={Colors.white} size={32} speed={1} animating={true} />
        </div>
      )}
    </StyledMainDiv>
  );
}

export default Music;
