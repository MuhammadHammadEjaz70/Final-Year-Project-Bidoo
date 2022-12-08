import {useState, useEffect} from 'react';
import './Timer.css';
import {getRemainingTimeUntilMsTimestamp} from './Utils/TimeUtlis';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

const Timer = ({TimeMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(TimeMs);
        }, 1000);
        return () => clearInterval(intervalId);
    },[TimeMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return(
        <div className="timer">
            <span>{remainingTime.days}</span>
            <span>d /</span>
            <span className="two-numbers">{remainingTime.hours}</span>
            <span>h /</span>
            <span className="two-numbers">{remainingTime.minutes}</span>
            <span>m /</span>
            <span className="two-numbers">{remainingTime.seconds}</span>
            <span>s</span>
        </div>
    );
}

export default Timer;