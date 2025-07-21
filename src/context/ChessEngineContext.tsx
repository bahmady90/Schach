import { createContext, useContext, useRef } from "react";
import { Chess } from "chess.js";

const ChessEngineContext = createContext<Chess | null>(null);

export function ChessEngineProvider({ children }: { children: React.ReactNode }) {
  const chessRef = useRef(new Chess());

  return (
    <ChessEngineContext.Provider value={chessRef.current}>
      {children}
    </ChessEngineContext.Provider>
  );
}

export function useChessEngine() {
  const context = useContext(ChessEngineContext);
  if (!context) {
    throw new Error("useChessEngine must be used within a ChessEngineProvider");
  }
  return context;
}