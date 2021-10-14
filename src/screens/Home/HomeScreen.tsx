import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import { MdPlace, MdHeadset } from "react-icons/md";
import { Levels } from "react-activity";
import "react-activity/dist/Levels.css";

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
import { handleCreatedWeatherMusic } from "../../helpers/createdWeatherMusic";

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

    switch (true) {
      case temperature < 16:
        musicCategory = "lofi";
        break;

      case temperature < 24:
        musicCategory = "classical";
        break;

      case temperature < 32:
        musicCategory = "pop";

        break;

      case temperature > 32:
        musicCategory = "rock";
        break;
      default:
        console.log(`Sorry, we are out of ${temperature}.`);
    }

    const music: any = await handleMusic(musicCategory);

    if (music !== undefined) {
      setWeatherMusic(
        music.map((item: any) =>
          handleCreatedWeatherMusic(item, getTemperature, musicCategory)
        )
      );
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
