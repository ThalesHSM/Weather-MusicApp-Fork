import React, { createContext, useContext, useState } from "react";

export interface IWeatherMusic {
  id: string;
  cityName: string;
  date: number;
  temperature: number;
  weatherImage: string;
  weatherName: string;
  musicAuthor: string;
  musicCategory: string;
  musicImage: string;
  musicName: string;
  musicSpotifyLink: string;
  musicShazamLink: string;
  saved: boolean;
}

interface IWeatherContext {
  weatherMusic: IWeatherMusic[];
  setWeatherMusic: React.Dispatch<React.SetStateAction<IWeatherMusic[]>>;
}

export const WeatherContext = createContext<IWeatherContext>({
  weatherMusic: [
    {
      cityName: "",
      id: "",
      date: 0,
      temperature: 0,
      weatherImage: "",
      weatherName: "",
      musicAuthor: "",
      musicCategory: "",
      musicImage: "",
      musicName: "",
      musicSpotifyLink: "",
      musicShazamLink: "",
      saved: false,
    },
  ],
  setWeatherMusic: () => {},
});

export default function WeatherProvider({ children }: any) {
  const [weatherMusic, setWeatherMusic] = useState<IWeatherMusic[]>([]);

  return (
    <WeatherContext.Provider value={{ weatherMusic, setWeatherMusic }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("UseWeather must be used within a WeatherProvider!");
  }
  const { weatherMusic, setWeatherMusic } = context;
  return { weatherMusic, setWeatherMusic };
}
