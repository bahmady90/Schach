import { useEffect } from "react";
import { useChess } from "../context/ChessContext";
import { useChessEngine } from "../context/ChessEngineContext";
import useSound from "use-sound";

export default function useChessUiLogic()
{
    const {clickedFigure, dispatch, availableMovesPerFigure, boardState, turn} = useChess();
    const chess = useChessEngine();
    const [moveSound] = useSound('../public/move.mp3');
    const [atackSound] = useSound('../public/atack.mp3');
    


    //hinzufügen des Rochagezugs zu den availableMovesPerFigure
    useEffect(() => {        
        //kingside-rochage
        if(availableMovesPerFigure.includes("O-O"))
            {
                //für weiß
                if(turn === "w")
                {
                    dispatch({type: "SET_AVAILABLEMOVES_PER_FIGURE", payload: [...availableMovesPerFigure, "g1"] })
                } //für schwarz
                else if(turn === "b")
                {
                    dispatch({type: "SET_AVAILABLEMOVES_PER_FIGURE", payload: [...availableMovesPerFigure, "g8"] })
                }
            }
        //queenside-rochage
        else if(availableMovesPerFigure.includes("O-O-O"))
        {   
            //für weiß
            if(turn === "w")
                {
                    dispatch({type: "SET_AVAILABLEMOVES_PER_FIGURE", payload: [...availableMovesPerFigure, "c1"] })
                }
            //für schwarz 
            else if(turn === "b")
                {
                    dispatch({type: "SET_AVAILABLEMOVES_PER_FIGURE", payload: [...availableMovesPerFigure, "c8"] })
                }
        }
    }, [availableMovesPerFigure, boardState, dispatch, turn])

    let promotion = false;
    const squaresPerFigure = availableMovesPerFigure.map((move) => {   
        if(move.includes("="))
        {
            promotion = true;
        }
        
        return move.match(/([a-h][1-8])/)?.[0];
        })

    function handleClickChessElement(position: string)
    {
        // @ts-expect-error the sqaure type is incompatibel to my position type. They are both string-types so it should be finde
        const moves = chess.moves({ square: position});
        dispatch({type : "SET_AVAILABLEMOVES_PER_FIGURE", payload: moves})
        dispatch({type: "SET_CLICKED_FIGURE", payload: position})

        
        if(clickedFigure)
        {
            if(!squaresPerFigure.includes(position))
            {   
                /* console.log(availableMovesPerFigure);
                console.log(position)
                console.log("no fiable move") */
                //wenn man versucht einen nicht erlaubten move zu machen soll nichts passieren
               
                return;
            }
           
            
            /* console.log(availableMovesPerFigure);
            console.log(clickedFigure);
            console.log(position); */
            // Im Falle einer Promotion kriegt man Einfachheit halber direkt die Dame. 
            if(promotion)
            {
                const move = chess.move({from: clickedFigure, to: position, promotion: "q"});
                if(!move.captured)
                {
                    moveSound();
                } else 
                {
                    atackSound();
                }
            } else
            {
                const move = chess.move({from: clickedFigure, to: position});
                console.log(move);
                if(!move.captured)
                {
                    moveSound();
                } else 
                {
                    atackSound();
                }
            }
            
            dispatch({type: "SET_BOARDSTATE", payload: chess.board()})
            dispatch({type: "SET_MOVES_PLAYED", payload: [clickedFigure, position]})
            dispatch({type: "SET_TURN"})
            
            
            
        }
        


    }

    return {handleClickChessElement, squaresPerFigure}
}