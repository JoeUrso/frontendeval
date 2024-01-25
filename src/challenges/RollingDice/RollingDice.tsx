import { useState } from "react";
import "./RollingDice.css";

export const Dice = (dots: number) => {
    return (
        <div className="dice">
            <div className="dot-row">
                <div className={dots >= 4 ? "dot" : ""}></div>
                <div className={dots >= 2 ? "dot" : ""}></div>
            </div>
            <div className="dot-row">
                <div className={dots >= 6 ? "dot" : ""}></div>
                <div
                    className={
                        dots === 1 || dots === 3 || dots === 5 ? "dot" : ""
                    }
                ></div>
                <div className={dots >= 6 ? "dot" : ""}></div>
            </div>
            <div className="dot-row">
                <div className={dots >= 2 ? "dot" : ""}></div>
                <div className={dots >= 4 ? "dot" : ""}></div>
            </div>
        </div>
    );
};

const RollingDice = () => {
    const [numberOfDie, setNumberOfDie] = useState(0);
    const [dieArray, setDieArray] = useState<JSX.Element[]>([]);

    const handleRoll = () => {
        const arr: JSX.Element[] = [];
        for (let i = 0; i < numberOfDie; i++) {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            arr.push(Dice(randomNumber));
        }

        setDieArray(arr);
        setNumberOfDie(0);
    };

    return (
        <div className="rolling-dice-container">
            <h1>Rolling Dice</h1>
            <div>
                <h2>Number of Dice</h2>
                <input
                    type="text"
                    value={numberOfDie}
                    onChange={(e) => {
                        if (Number(e.target.value) > 99) {
                            throw new Error("No No NO, that's more than 99");
                        }
                        setNumberOfDie(Number(e.target.value));
                    }}
                />
                <button onClick={handleRoll}>Roll</button>
            </div>
            <div className="dice-container">{dieArray.map((el) => el)}</div>
        </div>
    );
};

export default RollingDice;
