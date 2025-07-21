


export function fenToBoard(fen : string) {
  const rows = fen.split(" ")[0].split("/");

  return rows.map((row) => {
    const boardRow = [];

    for (const char of row) {
      if (isNaN(char)) {
        boardRow.push(char); // piece (e.g., 'p', 'R', etc.)
      } else {
        const emptySquares = parseInt(char);
        for (let i = 0; i < emptySquares; i++) {
          boardRow.push(null); // empty square
        }
      }
    }

    return boardRow;
  });
}


export function boardToFen(board) {
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

      // If row ends with empty squares
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


