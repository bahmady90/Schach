import { useEffect } from "react";
import { useChess } from "../context/ChessContext";
import { useChessEngine } from "../context/ChessEngineContext";
import useSound from "use-sound";

export default function useChessUiLogic() {
  const {
    clickedFigure,
    dispatch,
    availableMovesPerFigure,
    boardState,
    turn,
    makeMove,
  } = useChess();
  const chess = useChessEngine();
  const [moveSound] = useSound("../move.mp3");
  const [atackSound] = useSound("../atack.mp3");

  //hinzufügen des Rochagezugs zu den availableMovesPerFigure
  useEffect(() => {
    //kingside-rochage
    if (availableMovesPerFigure.includes("O-O")) {
      //für weiß
      if (turn === "w" && !availableMovesPerFigure.includes("g1")) {
        dispatch({
          type: "SET_AVAILABLEMOVES_PER_FIGURE",
          payload: [...availableMovesPerFigure, "g1"],
        });
      } //für schwarz
      else if (turn === "b" && !availableMovesPerFigure.includes("g8")) {
        dispatch({
          type: "SET_AVAILABLEMOVES_PER_FIGURE",
          payload: [...availableMovesPerFigure, "g8"],
        });
      }
    }
    //queenside-rochage
    else if (availableMovesPerFigure.includes("O-O-O")) {
      //für weiß
      if (turn === "w" && !availableMovesPerFigure.includes("c1")) {
        dispatch({
          type: "SET_AVAILABLEMOVES_PER_FIGURE",
          payload: [...availableMovesPerFigure, "c1"],
        });
      }
      //für schwarz
      else if (turn === "b" && !availableMovesPerFigure.includes("c8")) {
        dispatch({
          type: "SET_AVAILABLEMOVES_PER_FIGURE",
          payload: [...availableMovesPerFigure, "c8"],
        });
      }
    }
  }, [availableMovesPerFigure, boardState, dispatch, turn]);

  let promotion = false;
  const squaresPerFigure = availableMovesPerFigure.map((move) => {
    if (move.includes("=")) {
      promotion = true;
    }

    return move.match(/([a-h][1-8])/)?.[0];
  });

  function getScore(color: string): string {
    let scoreWhite = 0;
    let scoreBlack = 0;

    boardState.forEach((rowArray) => {
      rowArray.forEach((boardElement) => {
        if (!boardElement) return; // skip leere Felder

        if (boardElement.color === "w") {
          scoreWhite += getScorePerFigure(boardElement.type);
        } else {
          scoreBlack += getScorePerFigure(boardElement.type);
        }
      });
    });

    function getScorePerFigure(figure: string): number {
      switch (figure) {
        case "p":
          return 1;
        case "n":
          return 3;
        case "b":
          return 3;
        case "r":
          return 5;
        case "q":
          return 9;
        default:
          return 0;
      }
    }

    if (color === "w") {
      if (scoreWhite > scoreBlack) {
        return `+${scoreWhite - scoreBlack}`;
      } else {
        return "";
      }
    } else {
      if (scoreBlack > scoreWhite) {
        return `+${scoreBlack - scoreWhite}`;
      } else {
        return "";
      }
    }
  }

  function handleClickChessElement(position: string) {
    // @ts-expect-error the sqaure type is incompatibel to my position type. They are both string-types so it should be finde
    const moves = chess.moves({ square: position });
    dispatch({ type: "SET_AVAILABLEMOVES_PER_FIGURE", payload: moves });
    dispatch({ type: "SET_CLICKED_FIGURE", payload: position });

    if (clickedFigure) {
      if (!squaresPerFigure.includes(position)) {
        //wenn man versucht einen nicht erlaubten move zu machen soll nichts passieren
        return;
      }

      // Im Falle einer Promotion kriegt man Einfachheit halber direkt die Dame.
      if (promotion) {
        const move = chess.move({
          from: clickedFigure,
          to: position,
          promotion: "q",
        });
        if (!move.captured) {
          moveSound();
        } else {
          atackSound();
        }
      } else {
        const move = chess.move({ from: clickedFigure, to: position });
        if (!move.captured) {
          moveSound();
        } else {
          atackSound();
        }
      }

      makeMove(chess, clickedFigure, position);
    }
  }
  return { handleClickChessElement, squaresPerFigure, getScore };
}
