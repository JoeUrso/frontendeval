import { useEffect, useState } from "react";
import "./AnalogClock.css";

const AnalogClock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    }, []);

    const tick = () => {
        setDate(new Date());
    };

    const secondsRotation = date.getSeconds() * 6;
    const minutesRotation = date.getMinutes() * 6 + date.getSeconds() * 0.1;
    const hoursRotation = (date.getHours() % 12) * 30 + date.getMinutes() * 0.5;

    return (
        <div className="clock">
            <div
                className="hand hour"
                style={{ transform: `rotateZ(${hoursRotation}deg)` }}
            />
            <div
                className="hand minute"
                style={{ transform: `rotateZ(${minutesRotation}deg)` }}
            />
            <div
                className="hand second"
                style={{ transform: `rotateZ(${secondsRotation}deg)` }}
            />
            <div className="center-point" />
        </div>
    );
};

export default AnalogClock;
