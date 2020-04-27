import React, { useCallback, useState } from "react";
import { maxHeaderSize } from "http";

const size = "30";
const dim = 20;

const neighbourhood4 = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, -1],
];

function App() {
  const createCell = useCallback(
    () => ({
      isBomb: false,
      isFalgged: false,
      isReaveled: false,
      clue: 0,
    }),
    []
  );
  const createGrid = useCallback(
    (dim) => Array.from(Array(dim), () => Array.from(Array(dim), createCell)),
    []
  );
  const addClues = useCallback((setGrid) => {
    const neighbourhood8 = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];
    setGrid((grid: any) => {
      let swapGrid = [...grid];
      const rows = grid.length;
      const cols = grid[0].length;
      swapGrid = grid.map((row: any, x: number) =>
        row.map((cell: any, y: number) => {
          let count = 0;
          neighbourhood8.forEach(([dx, dy]) => {
            const shiftedX = x + dx,
              shiftedY = y + dy;
            if (
              shiftedX >= 0 &&
              shiftedX < rows &&
              shiftedY >= 0 &&
              shiftedY < cols
            ) {
              if (!cell.isBomb && grid[x + dx][y + dy].isBomb) count++;
            }
          });
          return { ...cell, clue: count };
        })
      );
      return swapGrid;
    });
  }, []);

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
      <button
        onClick={() => {
          addClues(setGrid);
        }}
      >
        Add clues
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!!cell.clue ? cell.clue : ""}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
