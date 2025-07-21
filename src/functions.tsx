import type { boardElementType } from "./types";



export function fenToBoard(fen : string) {
  const rows = fen.split(" ")[0].split("/");

  return rows.map((row) => {
    const boardRow = [];

    for (const char of row) {
      if (isNaN(Number(char))) {
        boardRow.push(char); 
      } else {
        const emptySquares = parseInt(char);
        for (let i = 0; i < emptySquares; i++) {
          boardRow.push(null); 
        }
      }
    }

    return boardRow;
  });
}


export function boardToFen(board : boardElementType[][]) {
  return board
    .map(row => {
      let emptyCount = 0;
      let fenRow = "";

      for (const cell of row) {
        if (!cell) {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            fenRow += emptyCount;
            emptyCount = 0;
          }
          fenRow += cell;
        }
      }

      
      if (emptyCount > 0) fenRow += emptyCount;

      return fenRow;
    })
    .join("/");
}


export function getInitalBotTurn()
{
  const turns = ["w", "b"];
  const randomIndex = Math.floor(Math.random() * 2);
  return turns[randomIndex];
}


