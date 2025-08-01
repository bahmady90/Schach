import { figuresStylingBlack, figuresStylingWhite } from "../constants";
import { useChess } from "../context/ChessContext";
import { useChessEngine } from "../context/ChessEngineContext";
import type { svgProps } from "../types";

export default function King({color, frameColor}: svgProps)
{
    const {turn} = useChess();
    const chess = useChessEngine();
    const isWhite = color === "w";
    const animateKingChecked = (chess.isCheck() && turn) === color ? "check" : ""
    return (
        <svg className={`${isWhite ? figuresStylingWhite : figuresStylingBlack} ${animateKingChecked}`} fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke={frameColor} strokeWidth="8px" d="M405.995 477.15h-300v-60h300v60zm-10.3-107.13h-279.4a96.88 96.88 0 0 1 6.65 31.12h266.1a96.88 96.88 0 0 1 6.65-31.12zm-139.7-241.06a35.76 35.76 0 0 0-35.76 35.76c0 50.16 35.76 99.34 35.76 99.34s35.76-49.18 35.76-99.34a35.76 35.76 0 0 0-35.76-35.76zm8-15.38V94.24h18.36v-16h-18.36V54.85h-16v23.39h-18.36v16h18.36v19.38a51.9 51.9 0 0 1 16-.04zm81.64 51.36a98.74 98.74 0 0 0-38.13 7.61c-3.23 51.75-37.07 98.85-38.58 100.93l-4.93 6.76V354h140c16.57-26.15 40.78-42.41 40.78-90a99.13 99.13 0 0 0-99.14-99.07zm-141.16 7.61a99.16 99.16 0 0 0-137.25 91.51c0 47.55 24.21 63.82 40.78 90h139.99v-73.82l-4.94-6.79c-1.51-2.05-35.34-49.15-38.58-100.9z"></path></g></svg>
    )

}