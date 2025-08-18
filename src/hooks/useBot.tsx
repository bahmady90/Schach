import { useChess } from "../context/ChessContext";
import { useChessEngine } from "../context/ChessEngineContext";
import {Move } from "chess.js";
import { useEffect, useRef } from "react";

type BestMove = Move | null;

interface WorkerMessage {
  fen: string;
  depth: number;
  botColor: string;
}

export default function useBot() {
  const { dispatch, botColor } = useChess();
  const chess = useChessEngine();

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL("../botWorker.ts", import.meta.url), {
      type: "module",
    });

    workerRef.current.onmessage = (event: MessageEvent<BestMove>) => {
      const bestMove = event.data;
      if (!bestMove) {
        dispatch({ type: "SET_BOT_CALCULATING_FALSE" });
        return;
      }

      const moveBefore = bestMove.from;
      const moveAfter = bestMove.to;
      const isPromotion = bestMove.promotion !== undefined;

      if (isPromotion) {
        chess.move({ from: moveBefore, to: moveAfter, promotion: "q" });
      } else {
        chess.move({ from: moveBefore, to: moveAfter });
      }

      dispatch({ type: "SET_BOARDSTATE", payload: chess.board() });
      dispatch({ type: "SET_MOVES_PLAYED", payload: [moveBefore, moveAfter] });
      dispatch({ type: "SET_TURN" });
      dispatch({ type: "SET_CLICKED_FIGURE", payload: "" });

      dispatch({ type: "SET_BOT_CALCULATING_FALSE" });
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [dispatch, chess]);

  function makeNextBotMove() {
    dispatch({ type: "SET_BOT_CALCULATING_TRUE" });

    workerRef.current?.postMessage({
      fen: chess.fen(),
      depth: 3,
      botColor,
    } as WorkerMessage);
  }

  return { makeNextBotMove };
}



