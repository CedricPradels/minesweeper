import React, { useCallback, useState, useEffect } from "react";

import styled from "styled-components";

import Bomb from "./components/Bomb";
import Flag from "./components/Flag";
import Smiley from "./components/Smiley";
import Button from "./components/Button";
import Cell from "./components/Cell";
import Grid from "./components/Grid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const size = 30;
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
    <Container>
      <Button
        style={{
          width: "100px",
          height: "100px",
          margin: "0",
        }}
        onClick={() => {
          setGrid(createGrid(dim));
          addBombs(30, setGrid);
          addClues(setGrid);
        }}
      >
        <Smiley />
      </Button>
      <Grid {...{ dim, size }}>
        {grid.map((row, x) =>
          row.map((cell, y) => (
            <Cell
              {...cell}
              {...{ size }}
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
            >
              {cell.isFalgged && <Flag />}
              {cell.isReaveled && cell.isBomb && <Bomb />}
              {cell.isReaveled && !!cell.clue && cell.clue}
            </Cell>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default App;
