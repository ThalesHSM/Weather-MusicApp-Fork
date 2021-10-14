import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeScreen from "../../screens/Home/HomeScreen";
import SongsScreen from "../../screens/Songs/SongsScreen";

import WeatherProvider from "../../context/WeatherContext";

function Routes() {
  return (
    <Router>
      <WeatherProvider>
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="/songs">
            <SongsScreen />
          </Route>
        </Switch>
      </WeatherProvider>
    </Router>
  );
}

export default Routes;
