import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-template-columns: ${(props: { size: number; dim: number }) =>
    `repeat(${props.dim}, ${props.size}px)`};
  border-width: 10px;
  border-style: ridge;
  border-color: black;
`;
