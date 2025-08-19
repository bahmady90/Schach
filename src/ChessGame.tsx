import Card from "./cards/Card";
import Chessboard from "./Chessboard";
import { useChess } from "./context/ChessContext";
import LoadingDots from "./LoadingDots";

export default function ChessGame() {
  const { botIsCalculating } = useChess();

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[1fr_1fr_3fr]">
      <div className=""></div>
      <div className="hidden lg:grid">
        <div className="justify-self-center self-start mt-[15%]">
          <Card color="b" />
        </div>
        <div className="justify-self-center self-end mb-[15%]">
          <Card color="w" />
        </div>
      </div>
      <div className="flex flex-col overflow-hidden justify-center items-center lg:items-start h-full  gap-y-4 relative">
        <div className="block lg:hidden">
          <Card color="b" />
        </div>
        <div className="relative w-full sm:w-[80vmin] aspect-square">
          <Chessboard />
          {botIsCalculating && (
            <div className="absolute inset-0 flex justify-center items-center  bg-opacity-40 text-white text-2xl z-10  gap-x-2 sm:gap-x-3 lg:gap-x-4">
              <p className="text-cyan-50 font-bold bg-none text-[1.2rem] sm:text-[1.5rem] lg:text-[1.8rem]">
                Sheevá denkt nach
              </p>
              <LoadingDots />
            </div>
          )}
        </div>
        <div className="block lg:hidden">
          <Card color="w" />
        </div>
      </div>
    </div>
  );
}
