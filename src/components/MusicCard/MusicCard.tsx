import React, { useEffect, useState } from "react";
import {
  StyledFeaturesDiv,
  StyledHeartIconDiv,
  StyledImageTextDiv,
  StyledMainDiv,
  StyledMusicDiv,
  StyledMusicLinksDiv,
  StyledTemperatureImageDiv,
} from "./StyledMusicCard";
import { HandleSetFirebaseItems } from "../../config/api/api";
import Colors from "../../utils/colors";
import { SiShazam } from "react-icons/si";
import { FaSpotify, FaTrashAlt } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import _ from "lodash";
import { IWeatherMusic } from "../../context/WeatherContext";

import { useNewUser } from "../../context/UserContext";

interface IMusic {
  isCelsius: boolean;
  item: IWeatherMusic;
  musicFirebase?: any;
  setMusicFirebase?: any;
  removeItem?: any;
  index?: number;
}

function MusicCard({
  isCelsius,
  item,
  removeItem,
  index,
  musicFirebase,
  setMusicFirebase,
}: IMusic) {
  const { newUser } = useNewUser();

  const [isItemSaved, setIsItemSaved] = useState<boolean>(item.saved);

  useEffect(() => {
    async function setItem() {
      await HandleSetFirebaseItems(musicFirebase, newUser.uid);
    }
    setItem();
  }, [musicFirebase]);

  async function handleSavedItem(item: IWeatherMusic) {
    if (newUser.uid) {
      setIsItemSaved(!isItemSaved);

      const newItem = _.cloneDeep(item);
      newItem.saved = !isItemSaved;

      if (newItem.saved) {
        if (musicFirebase && musicFirebase.length > 0) {
          return setMusicFirebase([...musicFirebase, newItem]);
        }

        return setMusicFirebase([newItem]);
      }

      const alteredMusicArray = musicFirebase.filter(function (
        item: IWeatherMusic
      ) {
        return item.id !== newItem.id;
      });

      return setMusicFirebase(alteredMusicArray);
    }

    return alert("You must be logged in to save a song!");
  }

  return (
    <StyledMainDiv>
      <div
        style={{
          display: "flex",
        }}
      >
        <h2 style={{ marginLeft: 10, marginRight: 10 }}>{item.date}</h2>
        <h2>{item.cityName}</h2>
      </div>
      <StyledMusicDiv>
        <StyledImageTextDiv>
          <img src={item.musicImage} alt="" style={{ width: 200 }} />
          <p style={{ maxWidth: 200, marginTop: 0 }}>{item.musicName}</p>
        </StyledImageTextDiv>
        <StyledFeaturesDiv>
          <StyledHeartIconDiv>
            {index === 0 || (index && index >= 0) ? (
              <>
                <AiFillHeart
                  size={36}
                  color={Colors.red}
                  style={{ marginRight: 15 }}
                />
                <FaTrashAlt
                  onClick={() => removeItem(item)}
                  size={30}
                  color={Colors.weakWhite}
                  style={{ marginLeft: 15, cursor: "pointer" }}
                />
              </>
            ) : (
              <>
                {isItemSaved ? (
                  <AiFillHeart
                    onClick={() => handleSavedItem(item)}
                    size={36}
                    color={Colors.red}
                    style={{ marginRight: 15, cursor: "pointer" }}
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={() => handleSavedItem(item)}
                    size={36}
                    color={Colors.grey}
                    style={{ marginRight: 15, cursor: "pointer" }}
                  />
                )}
              </>
            )}
          </StyledHeartIconDiv>
          <p>
            Based on your temperature we recommend that you listen to{" "}
            {item.musicAuthor} ({item.musicCategory})
          </p>
          <StyledTemperatureImageDiv>
            <img src={item.weatherImage} alt="" style={{ width: 100 }} />
            <div style={{ display: "flex" }}>
              {isCelsius ? (
                <>
                  <h1>{item.temperature}</h1>
                  <h2>°C</h2>
                </>
              ) : (
                <>
                  <h1>{item.temperature * 1.8 + 32}</h1>
                  <h2>°F</h2>
                </>
              )}
            </div>
          </StyledTemperatureImageDiv>
          <StyledMusicLinksDiv>
            <p>Listen Now!</p>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.musicShazamLink}
              >
                <SiShazam size={30} color={Colors.weakWhite} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.musicSpotifyLink}
                style={{ marginLeft: 20 }}
              >
                <FaSpotify size={30} color={Colors.weakWhite} />
              </a>
            </div>
          </StyledMusicLinksDiv>
        </StyledFeaturesDiv>
      </StyledMusicDiv>
    </StyledMainDiv>
  );
}

export default MusicCard;
