import React from "react";
import styled from "styled-components";

const StyledBomb = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  filter: drop-shadow(0 0 3px gray);
`;
const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: #000;
`;
const Rectangle = styled.div.attrs(({ rotate }: { rotate: number }) => ({
  rotate,
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => props.rotate}deg);
  width: 100%;
  height: 10%;
  background: #000;
`;

export default () => (
  <StyledBomb>
    <Circle />
    {[0, 45, 90, -45].map((angle) => (
      <Rectangle rotate={angle} />
    ))}
  </StyledBomb>
);
