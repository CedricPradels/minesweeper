import React from "react";
import styled from "styled-components";

const StyledFlag = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  filter: drop-shadow(0 0 3px gray);
`;

const Rectangle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5%;
  height: 100%;
  background: #000;
`;

const Triangle = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  clip-path: polygon(0 0, 100% 25%, 0 50%);
  width: 50%;
  height: 100%;
  background: red;
`;

export default () => (
  <StyledFlag>
    <Triangle />
    <Rectangle />
  </StyledFlag>
);
