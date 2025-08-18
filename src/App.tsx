import { useEffect } from "react";
import { useChessEngine } from "./context/ChessEngineContext";
import { useChess } from "./context/ChessContext";

import useBot from "./hooks/useBot";
import Modal from "./modals/Modal";
import StartGame from "./modals/StartGame";
import Header from "./Header";
import Result from "./modals/Result";
import useChessUiLogic from "./hooks/useChessUiLogic";
import ChessGame from "./ChessGame";
import ChooseAvatar from "./modals/ChooseAvatar";

function App() {
  const chess = useChessEngine();

  const { squaresPerFigure } = useChessUiLogic();

  console.log(squaresPerFigure);

  const {
    botColor,
    turn,
    botIsCalculating,
    gameState,
    openChooseAvatar,
    dispatch,
  } = useChess();

  const { makeNextBotMove } = useBot();

  const openModal =
    openChooseAvatar === true ||
    gameState === "initialize" ||
    gameState === "finish";

  useEffect(() => {
    if (gameState === "active") {
      if (chess.turn() === botColor && !botIsCalculating) {
        if (chess.isGameOver()) {
          return;
        }
        makeNextBotMove();
      }
    }
  }, [botColor, chess, makeNextBotMove, turn, botIsCalculating, gameState]);

  /* useEffect(() => {
    const promotionFen ="7k/5Q2/7K/8/8/8/8/8 w - - 0 1";
    chess.load(promotionFen);

    
  }, []); */

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (chess.isGameOver()) {
        dispatch({ type: "SET_GAMESTATE", payload: "finish" });
        if (chess.isDraw()) {
          dispatch({ type: "SET_GAMERESULT", payload: "unentschieden" });
        } else {
          if (turn === botColor) {
            dispatch({ type: "SET_GAMERESULT", payload: "gewonnen" });
          } else {
            dispatch({ type: "SET_GAMERESULT", payload: "verloren" });
          }
        }
      }
    }, 4000);

    return () => clearTimeout(timeout);
  }, [botColor, chess, dispatch, turn]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState === "active") {
        if (turn === botColor) {
          dispatch({ type: "INCREASE_TIME_BOT" });
        } else {
          dispatch({ type: "INCREASE_TIME_PLAYER" });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [botColor, dispatch, turn, gameState]);

  return (
    <main
      className="min-h-screen bg-[#050218]   
      grid gap-y-1 sm:grid-rows-[1fr_12fr] grid-rows-[1fr_11fr]"
    >
      <Header />
      {gameState === "active" && <ChessGame />}
      <Modal open={openModal}>
        {openChooseAvatar ? (
          <ChooseAvatar />
        ) : gameState === "finish" ? (
          <Result />
        ) : gameState === "initialize" ? (
          <StartGame />
        ) : (
          ""
        )}
      </Modal>
    </main>
  );
}

export default App;
