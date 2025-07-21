
import { useEffect } from "react";
import Chessboard from "./Chessboard";
import { useChessEngine } from "./context/ChessEngineContext";
import { useChess } from "./context/ChessContext";
import useBot from "./hooks/useBot";





function App() {

  const chess = useChessEngine();

  const {botColor, turn} = useChess();

  /* useEffect(() => {
    const promotionFen ="8/P7/8/8/8/8/8/4k2K w - - 0 1";
    chess.load(promotionFen);

    
  }, []); */



  const {makeRandomBotMove} = useBot();

  useEffect(() => {
    if(chess.turn() ===  botColor)
    {
      makeRandomBotMove();  
     
    }
  }, [botColor, chess, makeRandomBotMove, turn])

  return (
    <main className="w-full h-screen grid">


     <Chessboard/>
      
      
    </main>
    

  );
}



export default App;




