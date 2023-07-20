import {Player} from "../models/Player";
import {FC, useEffect, useRef, useState} from "react";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const [loser, setLoser] = useState<Player | null>(null)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => {
            if (prev === 0) {
                setLoser(currentPlayer)
                return prev
            }
            return prev - 1
        })
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => {
            if (prev === 0) {
                setLoser(currentPlayer)
                return prev
            }
            return prev - 1
        })
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        setLoser(null)
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart</button>
            </div>
            <h2>Чёрные {blackTime} </h2>
            <h2>Белые {whiteTime} </h2>
            {loser && <h2>Проиграл: {loser?.color}</h2>}
        </div>
    );
};

export default Timer;