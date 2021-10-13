import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import { MdPlace } from "react-icons/md";
import { Levels } from "react-activity";
import "react-activity/dist/Levels.css";

import Colors from "../../utils/colors";
import {
  StyledCelsiusButton,
  StyledCelsiusFahrenheitDiv,
  StyledCityDiv,
  StyledFahrenheitButton,
  StyledIconAndCityNameDiv,
  StyledImg,
  StyledMainDiv,
  StyledMainTemperatureDiv,
  StyledTodayWeatherName,
} from "./StyledHome";

import { useWeather } from "../../context/WeatherContext";

import { handleTemperature } from "../../config/api/api";
import Music from "../../components/MusicCard/Music";

interface ICityWeather {
  cityName: string;
  weatherImage: string;
  temperature: number;
  date: string;
  weatherName: string;
}

export default function HomeScreen() {
  const { weatherMusic, setWeatherMusic } = useWeather();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityWeather, setCityWeather] = useState<ICityWeather>();
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  async function handleInputChoice(selectedOption: any) {
    setIsLoading(true);

    const getTemperature = await handleTemperature(selectedOption.value);

    setCityWeather({
      cityName: getTemperature.title,
      date: getTemperature.consolidated_weather[0].applicable_date
        .split("-")
        .reverse()
        .join("-"),
      temperature: getTemperature.consolidated_weather[0].the_temp,
      weatherImage: `https://www.metaweather.com/static/img/weather/${getTemperature.consolidated_weather[0].weather_state_abbr}.svg`,
      weatherName: getTemperature.consolidated_weather[0].weather_state_name,
    });

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
        </StyledCelsiusFahrenheitDiv>

        <Input handleInputChoice={handleInputChoice} />

        {isLoading === false && cityWeather ? (
          <>
            <StyledImg src={cityWeather.weatherImage} alt="" />
            <h1 style={{ color: Colors.grey, fontSize: 30, marginTop: 40 }}>
              {cityWeather.weatherName}
            </h1>
            <StyledMainTemperatureDiv>
              {isCelsius ? (
                <>
                  <h1>
                    {JSON.stringify(cityWeather.temperature)
                      .slice(0, 2)
                      .replace(".", "")}
                  </h1>
                  <h2> °C</h2>
                </>
              ) : (
                <>
                  <h1 style={{ color: Colors.weakWhite }}>
                    {JSON.stringify(cityWeather.temperature * 1.8 + 32).slice(
                      0,
                      2
                    )}
                  </h1>
                  <h2> °F</h2>
                </>
              )}
            </StyledMainTemperatureDiv>

            <StyledTodayWeatherName>
              Today ● {cityWeather.date}
            </StyledTodayWeatherName>
            <StyledIconAndCityNameDiv>
              <MdPlace
                size={30}
                color={Colors.grey}
                style={{ marginRight: 15 }}
              />
              <h1 style={{ color: Colors.grey }}>{cityWeather.cityName}</h1>
            </StyledIconAndCityNameDiv>
          </>
        ) : (
          <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
            <Levels color={Colors.white} size={32} speed={1} animating={true} />
          </div>
        )}
      </StyledCityDiv>

      {cityWeather ? (
        <Music
          weather={cityWeather}
          isCelsius={isCelsius}
          temperature={cityWeather.temperature}
        />
      ) : null}
    </StyledMainDiv>
  );
}
