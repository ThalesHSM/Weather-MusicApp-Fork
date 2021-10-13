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
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
`;
