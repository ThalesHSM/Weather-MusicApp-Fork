import React, { createContext, useContext, useState } from "react";

interface IWeather {
  city: string;
  id: string | number[];
  date: number;
  temperature: number;
  music: string;
  saved: boolean;
}

interface IWeatherContext {
  weatherCity: IWeather[];
  setWeatherCity: React.Dispatch<React.SetStateAction<IWeather[]>>;
}

export const WeatherContext = createContext<IWeatherContext>({
  weatherCity: [
    { city: "", id: "", date: 0, temperature: 0, music: "", saved: false },
  ],
  setWeatherCity: () => {},
});

export default function WeatherProvider({ children }: any) {
  const [weatherCity, setWeatherCity] = useState<IWeather[]>([]);

  return (
    <WeatherContext.Provider value={{ weatherCity, setWeatherCity }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("UseWeather must be used within a WeatherProvider!");
  }
  const { weatherCity, setWeatherCity } = context;
  return { weatherCity, setWeatherCity };
}
