import { useChess } from "../context/ChessContext";
import { formatTime } from "../functions";
import useChessUiLogic from "../hooks/useChessUiLogic";
import type { CardProps } from "../types";

export default function Card({ color }: CardProps) {
  const { botColor, statsPlayer, statsBot, dataPlayer, botIsCalculating } =
    useChess();

  const { getScore } = useChessUiLogic();

  const isBot = botColor === color;

  const parentDivBackgroundStyling =
    color === "w" ? "bg-white shadow-gray-300" : "bg-gray-900 shadow-gray-500";

  const paragraphColor = color === "w" ? "text-black" : "text-white";

  return (
    <div
      className={`flex w-fit justify-center items-center gap-x-4 sm:gap-x-5 ${parentDivBackgroundStyling} justify-self-start rounded-3xl p-2 sm:p-3 shadow-sm `}
    >
      <div className="grid grid-rows-2 min-w-[3rem] sm:min-w-[4rem] md:min-w-[5rem]">
        <p className={`${paragraphColor} text-lg justify-self-center`}>
          {isBot ? "Sheevá" : dataPlayer.name}
        </p>
        <div className="flex justify-around items-center">
          <p className={`${paragraphColor} text-sm `}>
            {isBot ? formatTime(statsBot.time) : formatTime(statsPlayer.time)}
          </p>
          <p
            className={`${paragraphColor} text-[0.6rem] sm:text-[0.7rem] lg:text-[0.8rem] font-light`}
          >
            {getScore(color)}
          </p>
        </div>
      </div>

      <img
        className="w-14 sm:w-16 md:w-18 aspect-square p-1 rounded-full ring-2 ring-gray-700 dark:ring-gray-500 bg-black"
        src={
          isBot
            ? botIsCalculating
              ? "../../sheeva-calculating.png"
              : "../../sheeva.png"
            : `${dataPlayer.img}`
        }
        alt="Bordered avatar"
      ></img>
    </div>
  );
}
