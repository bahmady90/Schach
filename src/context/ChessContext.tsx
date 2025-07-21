import {
  createContext,
  useReducer,
  useContext,
  type ReactNode,
  type Dispatch as ReactDispatch,
} from "react";
import { initialBoardState } from "../constants";
import type { boardElementType, figureType } from "../types";
import { getInitalBotTurn } from "../functions";

type ChessState = {
  boardState: boardElementType[][];
  figure: figureType;
  allAvailableMoves: string[];
  availableMovesPerFigure: string[];
  clickedFigure: string;
  turn: "w" | "b"
  botColor: string
  movePlayed: Array<string>,
};

type Action =
  | { type: "SET_BOARDSTATE"; payload: boardElementType[][] }
  | { type: "SET_FIGURE"; payload: figureType }
  | { type: "SET_ALLAVAILABLE_MOVES"; payload: string[] }
  | { type: "SET_AVAILABLEMOVES_PER_FIGURE"; payload: string[] }
  | { type: "SET_CLICKED_FIGURE"; payload: string }
  | { type: "SET_TURN"}
  | { type: "SET_MOVES_PLAYED", payload: Array<string>}
  
type ChessContextType = ChessState & {
  dispatch: ReactDispatch<Action>;
};

const ChessContext = createContext<ChessContextType | undefined>(undefined);

const initialState: ChessState = {
  boardState: initialBoardState,
  figure: {
    pieceCode: "",
    square: ""
  },
  allAvailableMoves: [],
  availableMovesPerFigure: [],
  clickedFigure: "",
  turn: "w",
  botColor : getInitalBotTurn(),
  movePlayed: [],
};

function chessReducer(state: ChessState, action: Action): ChessState {
  switch (action.type) {
    case "SET_BOARDSTATE":
      return { ...state, boardState: action.payload };
    case "SET_FIGURE":
      return { ...state, figure: action.payload };
    case "SET_ALLAVAILABLE_MOVES":
      return { ...state, allAvailableMoves: action.payload };
    case "SET_AVAILABLEMOVES_PER_FIGURE":
      return { ...state, availableMovesPerFigure: action.payload };
    case "SET_CLICKED_FIGURE":
      return { ...state, clickedFigure: action.payload };
    case "SET_TURN":
      return {...state, turn: state.turn === "w" ? "b" : "w"}
    case "SET_MOVES_PLAYED":
      return {...state, movePlayed: action.payload}
    default:
      return state;
  }
}

export function ChessProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chessReducer, initialState);

  return (
    <ChessContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChessContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChess(): ChessContextType {
  const context = useContext(ChessContext);
  if (!context)
    throw new Error("useChess must be used within a ChessProvider");
  return context;
}