import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomeScreen from "../../screens/Home/HomeScreen";
import SongsScreen from "../../screens/Songs/SongsScreen";

import WeatherProvider from "../../context/WeatherContext";
import UserProvider from "../../context/UserContext";

function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Router>
      <WeatherProvider>
        <UserProvider>
          <Switch>
            <Route exact path="/">
              <HomeScreen setIsLoggedIn={setIsLoggedIn} />
            </Route>
            {isLoggedIn ? (
              <Route path="/songs">
                <SongsScreen />
              </Route>
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
        </UserProvider>
      </WeatherProvider>
    </Router>
  );
}

export default Routes;
