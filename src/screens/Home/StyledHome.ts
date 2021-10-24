import styled, { css } from "styled-components";
import Colors from "../../utils/colors";

interface IButton {
  isCelsius: boolean;
}

export const StyledCelsiusButton = styled.button<IButton>`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 40px;
  margin-top: -1px;

  background-color: ${Colors.weakBlue};
  color: ${Colors.white};
  font-size: 20px;
  ${(props) =>
    props.isCelsius === true &&
    css`
      background-color: ${Colors.weakWhite};
      color: ${Colors.darkBlue};
    `}
`;

export const StyledFahrenheitButton = styled.button<IButton>`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  margin-top: -1px;

  background-color: ${Colors.weakWhite};
  color: ${Colors.darkBlue};

  font-size: 20px;
  ${(props) =>
    props.isCelsius === true &&
    css`
      background-color: ${Colors.weakBlue};
      color: ${Colors.white};
    `}
`;

export const StyledUserPhoto = styled.img`
  width: 45px;
  height: 45px;
  margin-left: 10px;
  margin-top: -4px;
  border-radius: 22px;
`;

export const StyledLoginH3 = styled.h3`
  color: ${Colors.white};
  cursor: pointer;
  margin-left: 10px;
  margin-top: 7px;
`;

export const StyledCelsiusFahrenheitDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-top: 20px;
`;

export const StyledMainDiv = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
`;

export const StyledCityDiv = styled.div`
  display: flex;
  width: 500px;
  min-height: 100vh;
  background-color: ${Colors.darkBlue};
  flex-direction: column;
  align-items: center;
  position: fixed;
`;

export const StyledImg = styled.img`
  width: 350px;
  margin-right: 10px;
  margin-left: 10px;
`;

export const StyledMainTemperatureDiv = styled.div`
  display: flex;
  flex-direction: row;
  color: ${Colors.weakWhite};
  font-size: 50px;
  margin-bottom: -80px;
  margin-top: -50px;
`;

export const StyledTodayWeatherName = styled.p`
  color: ${Colors.grey};
  margin-top: 80px;
  font-size: 25px;
`;

export const StyledIconAndCityNameDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledFavoriteSongsDiv = styled.div`
  display: flex;
  flex: 1px;
  justify-content: flex-end;
  margin-right: 10px;
  margin-top: -15px;
`;

export const StyledLoadingDiv = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-bottom: 160px;
`;

export const StyledMusicLoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-left: 500px;
`;

export const StyledMusicCardDiv = styled.div`
  display: flex;
  color: ${Colors.white};
  flex-direction: column;
  align-items: center;
`;
