import React, { useEffect, useState } from "react";
import { MdPlace, MdHeadset } from "react-icons/md";
import { Levels } from "react-activity";
import "react-activity/dist/Levels.css";
import { Link } from "react-router-dom";

import { IWeatherMusic, useWeather } from "../../context/WeatherContext";
import { useNewUser } from "../../context/UserContext";

import { handleCreatedWeatherMusic } from "../../helpers/createdWeatherMusic";

import { GoogleLogin } from "../../config/Firebase/Firebase";

import { handleMusic, handleTemperature } from "../../config/api/api";

import MusicCard from "../../components/MusicCard/MusicCard";
import Input from "../../components/Input/Input";

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
  StyledLoginH3,
  StyledMainDiv,
  StyledMainTemperatureDiv,
  StyledMusicCardDiv,
  StyledMusicLoadingDiv,
  StyledTodayWeatherName,
  StyledUserPhoto,
} from "./StyledHome";

export default function HomeScreen({ setIsLoggedIn }: any) {
  const { weatherMusic, setWeatherMusic } = useWeather();
  const { newUser, setNewUser } = useNewUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [musicFirebase, setMusicFirebase] = useState<any>(null);

  useEffect(() => {
    setWeatherMusic([]);
  }, []);

  async function Login() {
    const result = await GoogleLogin();
    if (result.user.uid && result.user.photoURL) {
      setNewUser({
        uid: result.user.uid,
        avatarURL: result.user.photoURL,
      });
      setIsLoggedIn(true);
    } else {
      alert("Login Error!");
    }
  }

  async function handleInputChoice(selectedOption: {
    label: string;
    value: number;
  }) {
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
    setWeatherMusic(
      music.map((item: IWeatherMusic) =>
        handleCreatedWeatherMusic(item, getTemperature, musicCategory)
      )
    );

    setIsLoading(false);
  }

  function handleCelsiusFahrenheit() {
    setIsCelsius(!isCelsius);
  }

  return (
    <StyledMainDiv>
      <StyledCityDiv>
        <StyledCelsiusFahrenheitDiv>
          {newUser.avatarURL ? (
            <StyledUserPhoto src={newUser.avatarURL} alt="" />
          ) : (
            <StyledLoginH3 onClick={Login}>Login</StyledLoginH3>
          )}

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
            {newUser.uid ? (
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
            ) : (
              <h3
                style={{ cursor: "pointer", color: Colors.weakWhite }}
                onClick={() => {
                  alert("You must be logged in to see your saved musics!");
                }}
              >
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
            )}
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
                      <h1>{weatherMusic[0].temperature}</h1>
                      <h2> °C</h2>
                    </>
                  ) : (
                    <>
                      <h1>{weatherMusic[0].temperature * 1.8 + 32}</h1>
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

      {!isLoading && weatherMusic && weatherMusic.length > 0 ? (
        <StyledMusicCardDiv>
          {weatherMusic.map((item: any) => (
            <MusicCard
              item={item}
              key={item.id}
              isCelsius={isCelsius}
              musicFirebase={musicFirebase}
              setMusicFirebase={setMusicFirebase}
            />
          ))}
        </StyledMusicCardDiv>
      ) : (
        <StyledMusicLoadingDiv>
          <Levels color={Colors.white} size={32} speed={1} animating={true} />
        </StyledMusicLoadingDiv>
      )}
    </StyledMainDiv>
  );
}
