import type { ReactElement } from "react"
import useChessUiLogic from "./hooks/useChessUiLogic"
import { useChess } from "./context/ChessContext";
import type { boardElementType } from "./types";

type ChessElementProp = {
    bgColor: string,
    position: string,
    children: ReactElement | string,
    boardElement: boardElementType

}



export default function ChessElement({bgColor, position, children, boardElement} : ChessElementProp)
{
    const {handleClickChessElement} = useChessUiLogic();
    const {movePlayed, clickedFigure, turn} = useChess();

    const moveFrom = movePlayed[0];
    const moveTo = movePlayed[1];
    const cursorElementStyling = boardElement === null || boardElement.color !== turn ?  "" : "cursor-pointer";
    const dynamicElementColorStyling = (clickedFigure === position) && (boardElement?.color === turn) ? 
        "bg-gradient-to-r from-emerald-100 to-emerald-200 opcaity-80 border-1 sm:border-2 border-gray-800": position === moveFrom ? 
        "bg-gradient-to-r from-orange-200 to-red-200" : position === moveTo ? 
        "bg-gradient-to-r from-orange-300 to-red-300" : bgColor
    
    return (
        <div
              className={`flex items-center justify-center w-full h-full aspect-square ${dynamicElementColorStyling} select-none ${cursorElementStyling} focus:outline-none`}
              onClick={() =>  handleClickChessElement(position)}
            >
              {children}
        </div>
    )
}