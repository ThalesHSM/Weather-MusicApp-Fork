import React from "react";
import "./App.css";
import HomeScreen from "./screens/Home/HomeScreen";

import WeatherProvider from "./context/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <HomeScreen />
    </WeatherProvider>
  );
}

export default App;
