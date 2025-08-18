import { figuresStylingBlack, figuresStylingWhite, figuresStylingWhiteDarkBrackground } from "../constants";
import type { svgProps } from "../types";

export default function Rook({color, frameColor, isDark}: svgProps)
{
    const isWhite = color === "w";
    return (
        <svg className={isWhite ? isDark ? figuresStylingWhiteDarkBrackground : figuresStylingWhite : figuresStylingBlack} fill="currentColor" viewBox="-64 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke={frameColor} strokeWidth="8px" d="M368 32h-56a16 16 0 0 0-16 16v48h-48V48a16 16 0 0 0-16-16h-80a16 16 0 0 0-16 16v48H88.1V48a16 16 0 0 0-16-16H16A16 16 0 0 0 0 48v176l64 32c0 48.33-1.54 95-13.21 160h282.42C321.54 351 320 303.72 320 256l64-32V48a16 16 0 0 0-16-16zM224 320h-64v-64a32 32 0 0 1 64 0zm144 128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></g></svg>
    )
}