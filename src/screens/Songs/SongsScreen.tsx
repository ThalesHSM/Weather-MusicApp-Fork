import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { IWeatherMusic, useWeather } from "../../context/WeatherContext";
import { useNewUser } from "../../context/UserContext";

import {
  StyledGoBackDiv,
  StyledGoBackH2,
  StyledMainDiv,
  StyledMessageDiv,
} from "./StyledSongScreen";

import MusicCard from "../../components/MusicCard/MusicCard";
import { db } from "../../config/Firebase/Firebase";

import { getDoc, doc } from "firebase/firestore";
import { Levels } from "react-activity";
import Colors from "../../utils/colors";
import { HandleRemoveFirebaseItem } from "../../config/api/api";

function SongsScreen() {
  const { weatherMusic, setWeatherMusic } = useWeather();
  const { newUser } = useNewUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation<{ isCelsius: boolean }>();

  const { isCelsius } = location.state;

  useEffect(() => {
    async function handleSongs() {
      if (newUser.uid) {
        const musicRef = doc(db, "musics", newUser.uid);

        const getFirebaseItems = await getDoc(musicRef);

        if (getFirebaseItems.exists()) {
          const firebaseItems = getFirebaseItems.data();
          setWeatherMusic(firebaseItems.musicFirebase);

          setIsLoading(true);
          return;
        } else {
          // doc.data() will be undefined in this case
          alert("Error! We didn't find any saved item.");
        }
      }
    }
    handleSongs();
  }, []);

  async function removeItem(item: IWeatherMusic) {
    const musicFirebase = weatherMusic.filter(function (music: any) {
      return music.id !== item.id;
    });

    await HandleRemoveFirebaseItem(musicFirebase, newUser.uid);
    setWeatherMusic(musicFirebase);
  }

  return (
    <StyledMainDiv>
      <StyledGoBackDiv>
        {newUser.avatarURL ? (
          <img
            src={newUser.avatarURL}
            alt=""
            style={{
              width: 45,
              height: 45,
              marginLeft: 10,
              marginTop: 5,
              borderRadius: 22,
            }}
          />
        ) : null}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            marginLeft: 30,
          }}
        >
          <StyledGoBackH2>Go back</StyledGoBackH2>
        </Link>
      </StyledGoBackDiv>

      {isLoading ? (
        <>
          {weatherMusic && weatherMusic.length > 0 ? (
            <>
              {weatherMusic.map((item: any, index: number) => (
                <MusicCard
                  item={item}
                  isCelsius={isCelsius}
                  key={item.id}
                  removeItem={removeItem}
                  index={index}
                />
              ))}
            </>
          ) : (
            <StyledMessageDiv>
              <h1 style={{ color: "white" }}>
                You haven't added any songs yet 🎸
              </h1>
              <Link to="/" style={{ textDecoration: "none" }}>
                <StyledGoBackH2>Go back</StyledGoBackH2>
              </Link>
            </StyledMessageDiv>
          )}
        </>
      ) : (
        <Levels color={Colors.white} size={32} speed={1} animating={true} />
      )}
    </StyledMainDiv>
  );
}
export default SongsScreen;
