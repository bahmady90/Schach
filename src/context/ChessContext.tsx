import { createContext, useReducer, useContext, type ReactNode } from "react";
import { initialBoardState } from "../constants";
import type { boardElementType, DataPlayer, figureType, stats } from "../types";
import { getInitalBotTurn } from "../functions";
import type { Chess } from "chess.js";

type ChessState = {
  boardState: boardElementType[][];
  figure: figureType;
  allAvailableMoves: string[];
  availableMovesPerFigure: string[];
  clickedFigure: string;
  turn: "w" | "b";
  botColor: string;
  movePlayed: Array<string>;
  statsPlayer: stats;
  dataPlayer: DataPlayer;
  statsBot: stats;
  botIsCalculating: boolean;
  gameState: "initialize" | "active" | "finish";
  gameResult: "verloren" | "gewonnen" | "unentschieden" | "";
  openChooseAvatar: boolean;
};

type Action =
  | { type: "SET_BOARDSTATE"; payload: boardElementType[][] }
  | { type: "SET_FIGURE"; payload: figureType }
  | { type: "SET_ALLAVAILABLE_MOVES"; payload: string[] }
  | { type: "SET_AVAILABLEMOVES_PER_FIGURE"; payload: string[] }
  | { type: "SET_CLICKED_FIGURE"; payload: string }
  | { type: "SET_TURN" }
  | { type: "SET_MOVES_PLAYED"; payload: Array<string> }
  | { type: "SET_OPEN_MODAL"; payload: boolean }
  | { type: "INCREASE_TIME_PLAYER" }
  | { type: "INCREASE_TIME_BOT" }
  | { type: "INCREASE_MOVES" }
  | { type: "SET_BOT_CALCULATING_TRUE" }
  | { type: "SET_BOT_CALCULATING_FALSE" }
  | { type: "SET_GAMESTATE"; payload: "initialize" | "active" | "finish" }
  | {
      type: "SET_GAMERESULT";
      payload: "verloren" | "gewonnen" | "unentschieden" | "";
    }
  | { type: "RESET_GAME" }
  | { type: "SET_PLAYER_NAME"; payload: string }
  | { type: "SET_PLAYER_IMAGE"; payload: string }
  | { type: "SET_OPEN_CHOOSEAVATAR_DIV_TRUE" }
  | { type: "SET_OPEN_CHOOSEAVATAR_DIV_FALSE" };

type ChessContextType = ChessState & {
  dispatch: React.Dispatch<Action>;
  makeMove: (chess: Chess, clickedFigure: string, position: string) => void;
};

const ChessContext = createContext<ChessContextType | undefined>(undefined);

const initialState: ChessState = {
  boardState: initialBoardState,
  figure: {
    pieceCode: "",
    square: "",
  },
  allAvailableMoves: [],
  availableMovesPerFigure: [],
  clickedFigure: "",
  turn: "w",
  botColor: getInitalBotTurn(),
  movePlayed: [],
  statsPlayer: { time: 0, moves: 0 },
  statsBot: { time: 0, moves: 0 },
  botIsCalculating: false,
  gameState: "initialize",
  gameResult: "",
  dataPlayer: { name: "", img: "../../public/default.png" },
  openChooseAvatar: false,
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
      return { ...state, turn: state.turn === "w" ? "b" : "w" };
    case "SET_MOVES_PLAYED":
      return { ...state, movePlayed: action.payload };
    /* case "SET_OPEN_MODAL":
      return {...state, openModal: action.payload} */
    case "INCREASE_TIME_BOT":
      return {
        ...state,
        statsBot: {
          time: state.statsBot.time + 1,
          moves: state.statsBot.moves,
        },
      };
    case "INCREASE_TIME_PLAYER":
      return {
        ...state,
        statsPlayer: {
          time: state.statsPlayer.time + 1,
          moves: state.statsPlayer.moves,
        },
      };
    case "INCREASE_MOVES": {
      const isBotTurn = state.turn === state.botColor;
      return {
        ...state,
        statsBot: {
          ...state.statsBot,
          moves: isBotTurn ? state.statsBot.moves + 1 : state.statsBot.moves,
        },
        statsPlayer: {
          ...state.statsPlayer,
          moves: isBotTurn
            ? state.statsPlayer.moves
            : state.statsPlayer.moves + 1,
        },
      };
    }
    case "SET_BOT_CALCULATING_TRUE":
      return {
        ...state,
        botIsCalculating: true,
      };
    case "SET_BOT_CALCULATING_FALSE":
      return {
        ...state,
        botIsCalculating: false,
      };
    case "SET_GAMESTATE":
      return {
        ...state,
        gameState: action.payload,
      };
    case "SET_GAMERESULT":
      return {
        ...state,
        gameResult: action.payload,
      };
    case "RESET_GAME":
      return {
        ...initialState,
        gameState: "active",
      };
    case "SET_PLAYER_NAME":
      return {
        ...state,
        dataPlayer: { ...state.dataPlayer, name: action.payload },
      };
    case "SET_PLAYER_IMAGE":
      return {
        ...state,
        dataPlayer: { ...state.dataPlayer, img: action.payload },
      };
    case "SET_OPEN_CHOOSEAVATAR_DIV_TRUE":
      return {
        ...state,
        openChooseAvatar: true,
      };
    case "SET_OPEN_CHOOSEAVATAR_DIV_FALSE":
      return {
        ...state,
        openChooseAvatar: false,
      };

    default:
      return state;
  }
}

export function ChessProvider({ children }: { children: ReactNode }) {
  function makeMove(chess: Chess, clickedFigure: string, position: string) {
    dispatch({ type: "SET_BOARDSTATE", payload: chess.board() });
    dispatch({ type: "SET_MOVES_PLAYED", payload: [clickedFigure, position] });
    dispatch({ type: "INCREASE_MOVES" });
    dispatch({ type: "SET_TURN" });
  }
  const [state, dispatch] = useReducer(chessReducer, initialState);

  return (
    <ChessContext.Provider value={{ ...state, dispatch, makeMove }}>
      {children}
    </ChessContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChess(): ChessContextType {
  const context = useContext(ChessContext);
  if (!context) throw new Error("useChess must be used within a ChessProvider");
  return context;
}
