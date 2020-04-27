import React, { useCallback, useState } from "react";
import { maxHeaderSize } from "http";

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
  const addBombs = useCallback((bombs, setGrid) => {
    const randomTo = (max: number) => Math.floor(Math.random() * max);
    setGrid((grid: any) => {
      const rows = grid.length;
      const cols = grid[0].length;
      const swapGrid = [...grid];
      for (let i = 0; i < bombs; i++) {
        let xBomb, yBomb;
        do {
          xBomb = randomTo(rows);
          yBomb = randomTo(cols);
        } while (swapGrid[xBomb][yBomb].isBomb);
        swapGrid[xBomb][yBomb].isBomb = true;
      }
      return swapGrid;
    });
  }, []);

  const [grid, setGrid] = useState(createGrid(dim));

  return (
    <>
      <button
        onClick={() => {
          setGrid(createGrid(dim));
          addBombs(10, setGrid);
        }}
      >
        Add bombs
      </button>
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
              key={`${x}${y}`}
              style={{
                border: "1px black solid",
                backgroundColor: cell.isBomb ? "red" : "gray",
                width: size + "px",
                height: size + "px",
              }}
            ></div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
