import { useEffect, useState } from "react";

const Countdown = () => {
    const [timerStarted, setTimerStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (isPaused || !timerStarted) {
            return;
        }
        if (hours === 0 && minutes === 0 && seconds === 0) {
            console.log("DONE");
            if (!("Notification" in window)) {
                alert("Timer Complete");
            } else if (Notification.permission === "granted") {
                new Notification("Timer complete");
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        new Notification("Timer complete");
                    } else {
                        alert("Timer complete");
                    }
                });
            } else {
                alert("Timer complete");
            }
            return;
        }
        const timer = setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            } else if (hours > 0) {
                setHours(hours - 1);
                setMinutes(59);
                setSeconds(59);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [hours, minutes, seconds, isPaused, timerStarted]);

    return (
        <div>
            <h1>Countdown Timer</h1>
            {timerStarted ? (
                <div>
                    <div>{`${hours.toString().padStart(2, "0")} : ${minutes
                        .toString()
                        .padStart(2, "0")} : ${seconds
                        .toString()
                        .padStart(2, "0")}`}</div>
                    {isPaused ? (
                        <button
                            onClick={() => {
                                setIsPaused(false);
                            }}
                        >
                            Start
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setIsPaused(true);
                            }}
                        >
                            Pause
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setTimerStarted(false);
                            setIsPaused(false);
                        }}
                    >
                        Reset
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="HH"
                        aria-label="Hours"
                        onChange={(e) => {
                            setHours(parseInt(e.target.value));
                        }}
                    />
                    <span>:</span>
                    <input
                        type="text"
                        placeholder="MM"
                        aria-label="Minutes"
                        onChange={(e) => {
                            setMinutes(parseInt(e.target.value));
                        }}
                    />
                    <span>:</span>
                    <input
                        type="text"
                        placeholder="SS"
                        aria-label="Seconds"
                        onChange={(e) => {
                            setSeconds(parseInt(e.target.value));
                        }}
                    />
                    <button
                        onClick={() => {
                            setTimerStarted(true);
                        }}
                    >
                        Start
                    </button>
                </div>
            )}
        </div>
    );
};

export default Countdown;
