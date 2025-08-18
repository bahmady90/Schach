/// <reference lib="webworker" />

import { Chess, Move } from "chess.js";

declare const self: DedicatedWorkerGlobalScope;

interface WorkerMessage {
  fen: string;
  depth: number;
  botColor: string;
}

function evaluateBoard(chess: Chess, botColor: string): number {
  const values: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  let score = 0;
  const board = chess.board();

  for (const row of board) {
    for (const piece of row) {
      if (piece) {
        const val = values[piece.type];
        score += piece.color === botColor ? val : -val;
      }
    }
  }
  return score;
}

function minimaxAlphaBeta(
  chess: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  botColor: string
): number {
  if (depth === 0) return evaluateBoard(chess, botColor);

  const moves = chess.moves({ verbose: true }) as Move[];
  if (moves.length === 0) return evaluateBoard(chess, botColor);

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      chess.move(move);
      const evalScore = minimaxAlphaBeta(chess, depth - 1, alpha, beta, false, botColor);
      chess.undo();
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      chess.move(move);
      const evalScore = minimaxAlphaBeta(chess, depth - 1, alpha, beta, true, botColor);
      chess.undo();
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

function getBestMove(chess: Chess, depth: number, botColor: string): Move | null {
  const moves = chess.moves({ verbose: true }) as Move[];
  if (moves.length === 0) return null;

  let bestMove: Move | null = null;
  let bestScore = -Infinity;

  for (const move of moves) {
    chess.move(move);
    const score = minimaxAlphaBeta(chess, depth - 1, -Infinity, Infinity, false, botColor);
    chess.undo();

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { fen, depth, botColor } = event.data;
  const chess = new Chess();
  chess.load(fen);

  const bestMove = getBestMove(chess, depth, botColor);

  self.postMessage(bestMove);
};

export {};
