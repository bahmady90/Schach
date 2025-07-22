import Rook from "./figures/Rook";
import Knight from "./figures/Knight";
import Bishop from "./figures/Bishop";
import King from "./figures/King";
import Pawn from "./figures/Pawn";
import Queen from "./figures/Queen";
import ChessElement from "./ChessElement";
import useChessUiLogic from "./hooks/useChessUiLogic";

import { useChess } from "./context/ChessContext";
import { files } from "./constants";



export default function Chessboard() {

  const { boardState, movePlayed } = useChess();

  const { squaresPerFigure } = useChessUiLogic();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-800">
      {/* div fürs Schachbrett */}
        <div className="w-full sm:w-[90vmin] sm:max-w-[90vmin] aspect-square grid grid-cols-8 grid-rows-8 shadow-lg border-4 border-gray-300 rounded-lg">
          {boardState.flatMap((rowArray, rowIndex) =>
            //ich benutze hier flatmap um direkt ein 2d-array zu erhallten und kein array von arrays
            rowArray.map((boardElement, colIndex) => {
              //prüfe, ob das Feld schwarz oder weiß zu sein hat
              const isDark = (rowIndex + colIndex) % 2 === 1;
              //setze dementsprechend die farben für den Hintergrund bgColor und den Rand frameColor
              const bgColor = isDark ? "bg-gray-700" : "bg-gray-100";
              const frameColor = boardElement?.color === "w" ? "#364153" : "#FFFFFF"
              //abbhändig von der Schachfigur type zeige ich entsprechend die verschiedenen Figuren
              const svg =
                boardElement?.type === "r" ? <Rook color={boardElement.color} frameColor={frameColor} /> :
                  boardElement?.type === "n" ? <Knight color={boardElement.color} frameColor={frameColor} /> :
                    boardElement?.type === "b" ? <Bishop color={boardElement.color} frameColor={frameColor} /> :
                      boardElement?.type === "k" ? <King color={boardElement.color} frameColor={frameColor} /> :
                        boardElement?.type === "p" ? <Pawn color={boardElement.color} frameColor={frameColor} /> :
                          boardElement?.type === "q" ? <Queen color={boardElement.color} frameColor={frameColor} /> :
                            "";

              //die koordinaten des Feldes wie z.b a5
              const square = `${files[colIndex]}${8 - rowIndex}`;
              //Highlighting der möglichen Bewegungen einer Figur
              const isPreviewField = squaresPerFigure.includes(square) && !movePlayed.includes(square);

              const availableMovesStyling = isPreviewField
                ? isDark
                  ? "bg-gray-500 opacity-50"
                  : "bg-slate-300 opacity-50"
                : "";

              return (
                <ChessElement
                  bgColor={bgColor}
                  key={`${rowIndex}-${colIndex}`}
                  position={square}
                  boardElement={boardElement}
                >
                  <div className="relative w-full h-full">
                    <div className={`${availableMovesStyling} absolute inset-0 rounded-full z-0`} ></div>
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      {svg}
                    </div>
                  </div>
                </ChessElement>
              );
            })
          )}
        </div>
      
    </main>
  );

}