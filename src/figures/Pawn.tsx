import {figuresStylingBlack, figuresStylingWhite, figuresStylingWhiteDarkBrackground } from "../constants";
import type { svgProps } from "../types";

export default function Pawn({color, frameColor, isDark}: svgProps)
{
    
    const isWhite = color === "w";
    return(
        <svg className={isWhite ?  isDark ? figuresStylingWhiteDarkBrackground :figuresStylingWhite : figuresStylingBlack} fill="currentColor" viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke={frameColor} strokeWidth="8px" d="M105.1 224H80a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h16v5.49c0 44-4.14 86.6-24 122.51h176c-19.89-35.91-24-78.51-24-122.51V288h16a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-25.1c29.39-18.38 49.1-50.78 49.1-88a104 104 0 0 0-208 0c0 37.22 19.71 69.62 49.1 88zM304 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></g></svg>
    )
}    