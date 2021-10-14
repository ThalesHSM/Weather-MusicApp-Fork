import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import { MdPlace, MdHeadset } from "react-icons/md";
import { Levels } from "react-activity";
import "react-activity/dist/Levels.css";
import { v4 as uuid } from "uuid";

import Colors from "../../utils/colors";
import {
  StyledCelsiusButton,
  StyledCelsiusFahrenheitDiv,
  StyledCityDiv,
  StyledFahrenheitButton,
  StyledFavoriteSongsDiv,
  StyledIconAndCityNameDiv,
  StyledImg,
  StyledLoadingDiv,
  StyledMainDiv,
  StyledMainTemperatureDiv,
  StyledMusicLoadingDiv,
  StyledTodayWeatherName,
} from "./StyledHome";

import { handleMusic, handleTemperature } from "../../config/api/api";
import { Link } from "react-router-dom";
import { useWeather } from "../../context/WeatherContext";
import MusicCard from "../../components/MusicCard/MusicCard";

export default function HomeScreen() {
  const { weatherMusic, setWeatherMusic } = useWeather();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  useEffect(() => {
    setWeatherMusic([]);
  }, []);

  async function handleInputChoice(selectedOption: any) {
    setIsLoading(true);

    const getTemperature = await handleTemperature(selectedOption.value);
    const temperature = getTemperature.consolidated_weather[0].the_temp;
    let musicCategory = "";
    if (temperature) {
      if (temperature < 16) {
        musicCategory = "lofi";
      }
      if (temperature > 16 && temperature < 24) {
        musicCategory = "classical";
      }
      if (temperature > 24 && temperature < 32) {
        musicCategory = "pop";
      }
      if (temperature > 32) {
        musicCategory = "rock";
      }
    }

    const music = await handleMusic(musicCategory);

    if (music !== undefined) {
      let newArray: any = [];

      for (let i = 0; i < 5; i++) {
        newArray = [
          ...newArray,
          {
            id: uuid(),
            saved: false,
            cityName: getTemperature.title,
            date: getTemperature.consolidated_weather[0].applicable_date
              .split("-")
              .reverse()
              .join("/"),
            temperature: getTemperature.consolidated_weather[0].the_temp,
            weatherImage: `https://www.metaweather.com/static/img/weather/${getTemperature.consolidated_weather[0].weather_state_abbr}.svg`,
            weatherName:
              getTemperature.consolidated_weather[0].weather_state_name,

            musicAuthor: music[i]["track"]["subtitle"],
            musicCategory: musicCategory,
            musicImage: music[i]["track"]["images"]["coverart"],
            musicName: music[i]["track"]["share"]["subject"],
            musicSpotifyLink:
              music[i]["track"]["hub"]["providers"][0]["actions"][0]["uri"],
            musicShazamLink: music[i]["track"]["url"],
          },
        ];
      }
      setWeatherMusic(newArray);
    }

    setIsLoading(false);
  }

  function handleCelsiusFahrenheit() {
    setIsCelsius(!isCelsius);
  }

  return (
    <StyledMainDiv>
      <StyledCityDiv>
        <StyledCelsiusFahrenheitDiv>
          <StyledCelsiusButton
            onClick={handleCelsiusFahrenheit}
            isCelsius={isCelsius}
          >
            °C
          </StyledCelsiusButton>
          <StyledFahrenheitButton
            onClick={handleCelsiusFahrenheit}
            isCelsius={isCelsius}
          >
            °F
          </StyledFahrenheitButton>
          <StyledFavoriteSongsDiv>
            <Link
              to={{ pathname: "/songs", state: { isCelsius: isCelsius } }}
              style={{ textDecoration: "none" }}
            >
              <h3 style={{ cursor: "pointer", color: Colors.weakWhite }}>
                My favorite Songs
                <MdHeadset
                  size={26}
                  color={Colors.weakWhite}
                  style={{
                    marginRight: 15,
                    alignSelf: "center",
                    justifySelf: "center",
                    marginBottom: -8,
                    marginLeft: 10,
                  }}
                />
              </h3>
            </Link>
          </StyledFavoriteSongsDiv>
        </StyledCelsiusFahrenheitDiv>

        <Input handleInputChoice={handleInputChoice} />

        {weatherMusic && weatherMusic.length <= 0 ? (
          <>
            {isLoading ? (
              <StyledLoadingDiv>
                <Levels
                  color={Colors.white}
                  size={32}
                  speed={1}
                  animating={true}
                />
              </StyledLoadingDiv>
            ) : (
              <h2 style={{ color: "white" }}>Search for a city!</h2>
            )}
          </>
        ) : (
          <>
            {!isLoading && weatherMusic && weatherMusic.length > 0 ? (
              <>
                <StyledImg src={weatherMusic[0].weatherImage} alt="" />
                <h1 style={{ color: Colors.grey, fontSize: 30, marginTop: 40 }}>
                  {weatherMusic[0].weatherName}
                </h1>
                <StyledMainTemperatureDiv>
                  {isCelsius ? (
                    <>
                      <h1>
                        {JSON.stringify(weatherMusic[0].temperature)
                          .slice(0, 2)
                          .replace(".", "")}
                      </h1>
                      <h2> °C</h2>
                    </>
                  ) : (
                    <>
                      <h1 style={{ color: Colors.weakWhite }}>
                        {JSON.stringify(
                          weatherMusic[0].temperature * 1.8 + 32
                        ).slice(0, 2)}
                      </h1>
                      <h2> °F</h2>
                    </>
                  )}
                </StyledMainTemperatureDiv>

                <StyledTodayWeatherName>
                  Today ● {weatherMusic[0].date}
                </StyledTodayWeatherName>
                <StyledIconAndCityNameDiv>
                  <MdPlace
                    size={30}
                    color={Colors.grey}
                    style={{ marginRight: 15 }}
                  />
                  <h1 style={{ color: Colors.grey }}>
                    {weatherMusic[0].cityName}
                  </h1>
                </StyledIconAndCityNameDiv>
              </>
            ) : (
              <StyledLoadingDiv>
                <Levels
                  color={Colors.white}
                  size={32}
                  speed={1}
                  animating={true}
                />
              </StyledLoadingDiv>
            )}
          </>
        )}
      </StyledCityDiv>

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
          <StyledMusicLoadingDiv>
            <Levels color={Colors.white} size={32} speed={1} animating={true} />
          </StyledMusicLoadingDiv>
        )}
      </StyledMainDiv>
    </StyledMainDiv>
  );
}
