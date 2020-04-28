import React, { useCallback, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";

import Bomb from "./components/Bomb";
import Flag from "./components/Flag";

const size = "30";
const dim = 20;

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

  useEffect(() => {
    const flatGrid = grid.flat();
    if (flatGrid.filter((x) => x.isBomb).some((bomb) => bomb.isReaveled)) {
      alert("Boom");
    } else if (
      flatGrid.filter((x) => x.isBomb).every((bomb) => bomb.isFalgged) &&
      flatGrid.filter((x) => !x.isBomb).every((safe) => safe.isReaveled)
    ) {
      alert("You are safe !");
    }
  });

  return (
    <>
      <button
        onClick={() => {
          setGrid(createGrid(dim));
          addBombs(30, setGrid);
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
              onContextMenu={(e) => {
                e.preventDefault();
                const swapGrid = [...grid];
                swapGrid[x][y].isFalgged = !swapGrid[x][y].isFalgged;
                setGrid(swapGrid);
              }}
              onClick={() => {
                if (!cell.isReaveled && !cell.isFalgged) {
                  let swapGrid = [...grid];
                  if (cell.isBomb) {
                    swapGrid = grid.map((x) =>
                      x.map((y) => (y.isBomb ? { ...y, isReaveled: true } : y))
                    );
                  } else if (!!cell.clue) {
                    swapGrid[x][y].isReaveled = true;
                  } else {
                    const resolve = (x: any, y: any) => {
                      neighbourhood8.forEach(([dx, dy]) => {
                        const shiftedX = x + dx,
                          shiftedY = y + dy;
                        if (
                          shiftedX >= 0 &&
                          shiftedX < dim &&
                          shiftedY >= 0 &&
                          shiftedY < dim
                        ) {
                          const { isReaveled, isBomb, clue } = swapGrid[
                            shiftedX
                          ][shiftedY];
                          if (!isReaveled) {
                            if (clue === 0 && !isBomb) {
                              swapGrid[shiftedX][shiftedY].isReaveled = true;
                              resolve(shiftedX, shiftedY);
                            } else if (clue > 0) {
                              swapGrid[shiftedX][shiftedY].isReaveled = true;
                            }
                          }
                        }
                      });
                    };
                    resolve(x, y);
                  }
                  setGrid(swapGrid);
                }
              }}
              key={`${x}${y}`}
              style={{
                fontFamily: "courier",
                fontWeight: "bold",
                borderWidth: cell.isReaveled ? "1px" : "3px",
                borderStyle: cell.isReaveled ? "solid" : "outset",
                borderColor: cell.isReaveled ? "dimgray" : "lightgray",
                boxSizing: "border-box",
                backgroundColor: !cell.isReaveled
                  ? "silver"
                  : cell.isBomb
                  ? "red"
                  : "darkgray",
                width: size + "px",
                height: size + "px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5% 5%",
              }}
            >
              {cell.isFalgged && <Flag />}
              {cell.isReaveled && cell.isBomb && <Bomb />}
              {cell.isReaveled && !!cell.clue && cell.clue}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
