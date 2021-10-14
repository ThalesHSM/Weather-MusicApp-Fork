import styled from "styled-components";
import Colors from "../../utils/colors";

export const StyledMainDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const StyledMusicDiv = styled.div`
  display: flex;
  background-color: ${Colors.darkBlue};
  color: ${Colors.weakWhite};
  width: 800px;
  height: 300px;
  margin: 0px 10px 20px 10px;
`;

export const StyledImageTextDiv = styled.div`
  margin: 10px 0 10px 10px;
`;

export const StyledFeaturesDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 10px 10px 10px;
  flex-direction: column;
`;

export const StyledHeartIconDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

export const StyledTemperatureImageDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: -20px;
`;

export const StyledMusicLinksDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;
