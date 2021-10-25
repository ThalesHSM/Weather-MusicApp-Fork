import styled from "styled-components";
import Colors from "../../utils/colors";

export const StyledMainDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  color: ${Colors.white};
  align-items: center;
`;

export const StyledGoBackDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const StyledMessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledGoBackH2 = styled.h2`
  cursor: pointer;
  color: ${Colors.weakWhite};
`;
