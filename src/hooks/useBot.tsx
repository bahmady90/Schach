import { useChess } from "../context/ChessContext";
import { useChessEngine } from "../context/ChessEngineContext";

export default function useBot()
{
    const {dispatch} = useChess();
    const chess = useChessEngine();


    function makeRandomBotMove() {
        const possibleMoves = chess.moves({verbose: true});
        if (possibleMoves.length === 0) return; // Game over or no legal moves

        const randomNumber = Math.floor(Math.random() * possibleMoves.length);

        const moveBefore = possibleMoves[randomNumber].from;
        const moveAfter = possibleMoves[randomNumber].to;
        const isPromotion = possibleMoves[randomNumber].isPromotion();

        setTimeout(() => {
            // Im Falle einer Promotion kriegt man Einfachheit halber direkt die Dame. 
            if(isPromotion)
            {   
                chess.move({from: moveBefore, to: moveAfter, promotion: "q"});
            }
            else
            {
                chess.move({from: moveBefore, to: moveAfter});
            }
            dispatch({type: "SET_BOARDSTATE", payload: chess.board()})
            dispatch({type: "SET_MOVES_PLAYED", payload: [moveBefore, moveAfter]})
            dispatch({type: "SET_TURN"})
            dispatch({type: "SET_CLICKED_FIGURE", payload: ""})
        }, 300)

        
    }

    return {makeRandomBotMove}
}



