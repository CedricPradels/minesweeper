import React from "react";
import styled from "styled-components";

const StyledSmiley = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;
const Face = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid black;
  background-color: yellow;
`;
const EyeX = styled.div``;
const EyeO = styled.div`
  position: absolute;
  box-sizing: border-box;
  left: 50%;
  top: 35%;
  width: 50%;
  height: 20%;
  transform: translate(-50%, -50%);
  &:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    background-color: black;
    left: 0;
    border-radius: 50%;
    width: 20%;
    height: 100%;
  }
  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    background-color: black;
    right: 0;
    border-radius: 50%;
    width: 20%;
    height: 100%;
  }
`;
const MouthC = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 60%;
  height: 60%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0 0 50% 50%;
  border-bottom: 5px black solid;
`;
const MouthI = styled.div``;

export default () => {
  return (
    <StyledSmiley>
      <Face>
        <EyeO />
        <MouthC />
      </Face>
    </StyledSmiley>
  );
};
