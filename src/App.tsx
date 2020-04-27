import React, { useCallback, useState } from "react";

const size = "30";
const dim = 20;

function App() {
  const createCell = useCallback(
    () => ({
      isBomb: false,
      isFalgged: false,
      isReaveled: false,
    }),
    []
  );
  const createGrid = useCallback(
    (dim) => Array.from(Array(dim), () => Array.from(Array(dim), createCell)),
    []
  );
  const addBombs = useCallback((bombs, grid) => {}, []);

  const [grid, setGrid] = useState(createGrid(dim));

  console.log(grid);

  return (
    <div
      className="App"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${dim}, ${size}px)`,
      }}
    >
      {grid.map((row, x) =>
        row.map((cell, y) => (
          <div
            style={{
              border: "1px black solid",
              backgroundColor: "gray",
              width: size + "px",
              height: size + "px",
            }}
          ></div>
        ))
      )}
    </div>
  );
}

export default App;
