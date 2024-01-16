import { useState } from "react";
import "./UndoableCounter.css";

type HistoryObj = {
    action: number;
    before: number;
    after: number;
};

const UndoableCounter = () => {
    const [currentCount, setCurrentCount] = useState(0);
    const [countHistory, setCountHistory] = useState<HistoryObj[]>([]);
    const [undoneActions, setUndoneActions] = useState<HistoryObj[]>([]);

    const handleChangeCountClick = (changeBy: number) => {
        const newAction = {
            action: changeBy,
            before: currentCount,
            after: currentCount + changeBy,
        };

        setCountHistory((prev) => [newAction, ...prev]);
        setCurrentCount((prev) => prev + changeBy);
    };

    const handleUndoClick = () => {
        if (countHistory.length > 0) {
            const prevCount = countHistory[0].before;
            const updatedHistory = countHistory.slice(1);
            const lastAction = countHistory[0];

            setUndoneActions((prev) =>
                lastAction ? [lastAction, ...prev] : []
            );
            setCurrentCount(prevCount);
            setCountHistory(updatedHistory);
        }
    };

    const handleRedoClick = () => {
        if (undoneActions.length > 0) {
            const redoCount = undoneActions[0].after;
            const updatedUndoneActions = undoneActions.slice(1);
            const removedAction = undoneActions[0];

            setUndoneActions(updatedUndoneActions);
            setCurrentCount(redoCount);
            setCountHistory((prev) =>
                removedAction ? [removedAction, ...prev] : []
            );
        }
    };

    return (
        <div className="undoable-counter-container">
            <h1>Undoable Counter</h1>
            <div className="undo-redo-container">
                <button onClick={handleUndoClick}>Undo</button>
                <button
                    onClick={handleRedoClick}
                    disabled={undoneActions[0] ? false : true}
                >
                    Redo
                </button>
            </div>
            <div className="count-container">
                <div className="change-count-container">
                    <button
                        onClick={() => {
                            handleChangeCountClick(-100);
                        }}
                    >
                        -100
                    </button>
                    <button
                        onClick={() => {
                            handleChangeCountClick(-10);
                        }}
                    >
                        -10
                    </button>
                    <button
                        onClick={() => {
                            handleChangeCountClick(-1);
                        }}
                    >
                        -1
                    </button>
                </div>
                <div>{currentCount}</div>
                <div className="change-count-container">
                    <button
                        onClick={() => {
                            handleChangeCountClick(1);
                        }}
                    >
                        +1
                    </button>
                    <button
                        onClick={() => {
                            handleChangeCountClick(10);
                        }}
                    >
                        +10
                    </button>
                    <button
                        onClick={() => {
                            handleChangeCountClick(100);
                        }}
                    >
                        +100
                    </button>
                </div>
            </div>
            <div className="history-container">
                <h2>History</h2>
                {countHistory.map((count) => {
                    return (
                        <div className="history-info-container">
                            <div>
                                {Math.sign(count.action) === 1 && (
                                    <span>+</span>
                                )}
                                {count.action}
                            </div>
                            <div>
                                <span>(</span>
                                {count.before}
                                <span>
                                    <span>-</span>
                                </span>
                                {count.after}
                                <span>)</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UndoableCounter;
