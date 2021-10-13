import React, { useEffect, useState } from "react";
import { StyledMainDiv, StyledMusicDiv } from "./StyledMusicCard";
import {
  handleMusic,
  HandleRemoveStorageItem,
  HandleSetStorageItems,
} from "../../config/api/api";
import Colors from "../../utils/colors";
import { SiShazam } from "react-icons/si";
import { FaSpotify } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Levels } from "react-activity";
import "react-activity/dist/Levels.css";
import _ from "lodash";

interface IMusic {
  isCelsius: boolean;
  item: any;
}

function MusicCard({ isCelsius, item }: IMusic) {
  const [isItemSaved, setIsItemSaved] = useState<boolean>(item.saved);

  function handleSavedItem(item: any) {
    setIsItemSaved(!isItemSaved);

    const newItem = _.cloneDeep(item);
    newItem.saved = !isItemSaved;
    if (newItem.saved) {
      return HandleSetStorageItems(newItem);
    }
    return HandleRemoveStorageItem(newItem);
  }

  return (
    <StyledMainDiv>
      <div>
        <div
          style={{
            display: "flex",
          }}
        >
          <h2 style={{ marginLeft: 10, marginRight: 10 }}>{item.date}</h2>
          <h2>{item.cityName}</h2>
        </div>
        <StyledMusicDiv>
          <div
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <img src={item.musicImage} alt="" style={{ width: 200 }} />
            <p style={{ maxWidth: 200 }}>{item.musicName}</p>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginRight: 10,
              marginBottom: 10,
              marginTop: 10,
              flexDirection: "column",
              marginLeft: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-start",
              }}
            >
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
            </div>
            {}
            <p>
              Based on your temperature we recommend that you listen to{" "}
              {item.musicAuthor}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <img src={item.weatherImage} alt="" style={{ width: 100 }} />
              <div style={{ display: "flex" }}>
                {isCelsius ? (
                  <>
                    <h1>
                      {JSON.stringify(item.temperature)
                        .slice(0, 2)
                        .replace(".", "")}
                    </h1>
                    <h2>°C</h2>
                  </>
                ) : (
                  <>
                    <h1>
                      {JSON.stringify(item.temperature * 1.8 + 32).slice(0, 2)}
                    </h1>
                    <h2>°F</h2>
                  </>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",

                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
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
                >
                  <FaSpotify
                    size={30}
                    color={Colors.weakWhite}
                    style={{ marginLeft: 15 }}
                  />
                </a>
              </div>
            </div>
          </div>
        </StyledMusicDiv>
      </div>
    </StyledMainDiv>
  );
}

export default MusicCard;
