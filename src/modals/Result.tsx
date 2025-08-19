import Button from "../Button";
import { useChess } from "../context/ChessContext";
import { useChessEngine } from "../context/ChessEngineContext";
import { formatTime } from "../functions";

export default function Result() {
  const chess = useChessEngine();

  const { statsPlayer, gameResult, dispatch } = useChess();

  const { time, moves } = statsPlayer;

  function handleClick() {
    chess.reset();
    dispatch({ type: "RESET_GAME" });
  }

  return (
    <div
      className="grid grid-rows-[2fr_3fr_2fr] h-full rounded-2xl shadow-white shadow-sm sm:gap-y-1"
      style={{
        background:
          'linear-gradient(rgba(20,16,36,.75), rgba(20,16,36,.85)), url("https://bigthink.com/wp-content/uploads/2022/01/AdobeStock_236786791.jpeg") center / cover fixed no-repeat',
        backgroundColor: "#141024",
        color: "#f5f5f7",
      }}
    >
      <div className="justify-self-center sm:mt-8 mt-4 flex justify-center items-center flex-col gap-y-1 sm:gap-y-2">
        <h1 className="font-bold text-[20px] sm:text-[30px]  text-neutral-300 sm:mt-6">
          {gameResult === "gewonnen"
            ? "Gewonnen!"
            : gameResult === "verloren"
            ? "Verloren!"
            : "Unentschieden!"}
        </h1>
        <p
          className={`text-bold text-gray-300 sm:text-[20px] text-[14px] mt-2`}
        >
          Spiel ist vorbei. Hier sind die Ergebnise...
        </p>
      </div>
      <div className="flex gap-y-2 flex-col justify-center items-center">
        <div
          className={`bg-none flex  sm:h-[72px] h-[48px] rounded-lg items-center w-full sm:w-[50%] justify-around sm:justify-self-center`}
        >
          <p className={`text-[#FCFCFC] font-bold`}>Vergangene Zeit</p>
          <p className={`text-[#FCFCFC] font-bold`}>{formatTime(time)}</p>
        </div>
        <div
          className={`bg-none flex  sm:h-[72px] h-[48px] rounded-lg items-center w-full sm:w-[50%] justify-around sm:justify-self-center`}
        >
          <p className={`text-[#FCFCFC] font-bold`}>Anzahl der Züge</p>
          <p className={`text-[#FCFCFC] font-bold`}>{moves}</p>
        </div>
      </div>
      <div className="justify-self-center self-center" onClick={handleClick}>
        <Button type="button">Neustarten</Button>
      </div>
    </div>
  );
}
