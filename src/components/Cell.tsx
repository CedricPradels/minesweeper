import styled from "styled-components";

interface Props {
  isReaveled: boolean;
  isBomb: boolean;
  size: number;
}

export default styled.div.attrs(({ isReaveled, isBomb, size }: Props) => ({
  isBomb,
  isReaveled,
  size,
}))`
  font-family: courier;
  font-weight: bold;
  border-width: ${({ isReaveled }) => (isReaveled ? "1px" : "3px")};
  border-style: ${({ isReaveled }) => (isReaveled ? "solid" : "outset")};
  border-color: ${({ isReaveled }) => (isReaveled ? "dimgray" : "lightgray")};
  box-sizing: border-box;
  background-color: ${({ isReaveled, isBomb }) => {
    if (!isReaveled) {
      return "silver";
    } else {
      return isBomb ? "red" : "darkgray";
    }
  }};
  width: ${({ size }) => {
    return `${size}px`;
  }};
  height: ${({ size }) => size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5% 5%;
`;
