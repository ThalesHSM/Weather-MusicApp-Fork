import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import { useWeather } from "../../context/WeatherContext";
import { MdPlace } from "react-icons/md";

import Colors from "../../utils/colors";
import {
  StyledCelsiusButton,
  StyledCelsiusFahrenheitDiv,
  StyledCityDiv,
  StyledComponentsDiv,
  StyledFahrenheitButton,
  StyledIconAndCityNameDiv,
  StyledImg,
  StyledMainDiv,
  StyledMainTemperatureDiv,
  StyledTodayWeatherName,
} from "./StyledHome";

import { handleMusic, handleTemperature } from "../../config/api/api";
import MusicCard from "../../components/MusicCard/MusicCard";

interface ICityWeather {
  cityName: string;
  weatherImage: string;
  temperature: number;
  date: string;
  weatherName: string;
}

export default function HomeScreen() {
  const { weatherCity, setWeatherCity } = useWeather();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityWeather, setCityWeather] = useState<ICityWeather>();
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  // useEffect(() => {
  //   async function abc() {
  //     await handleTemperature("London");
  //   }

  //   abc();
  // }, []);

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
                    {cityWeather.temperature
                      .toString()
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
                    °F
                  </h1>
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
          <p></p>
        )}
      </StyledCityDiv>

      <StyledComponentsDiv>
        <MusicCard />
      </StyledComponentsDiv>
    </StyledMainDiv>
  );
}
