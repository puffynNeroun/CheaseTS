import './assets/style/App.css'
import BoardComponent from "./assets/components/BoardComponent/BoardComponent";
import {Board} from "./assets/models/Board";
import {useEffect, useState} from "react";
import {Player} from "./assets/models/Player";
import {Colors} from "./assets/models/Colors";
import LostFigures from "./assets/components/LostFigures/LostFigures";
import Timer from "./assets/components/Timer";

function App() {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])


    function restart() {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className='app'>
            <Timer
                currentPlayer={currentPlayer}
                restart={restart}
            />
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title={"Чёрные фигуры"}
                    figures={board.lostBlackFigures}
                />
                <hr/>
                <LostFigures
                    title={"Белые фигуры"}
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    )
}

export default App
