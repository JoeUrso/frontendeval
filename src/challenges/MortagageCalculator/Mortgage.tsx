import { useState } from "react";
import "./Mortgage.css";

const Mortgage = () => {
    const [principle, setPrinciple] = useState(0);
    const [monthlyInterestRate, setMonthlyInterestRate] = useState(0);
    const [lengthOfLoan, setLengthOfLoan] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState<null | number>(null);

    const calculate = () => {
        const p = principle;
        const r = monthlyInterestRate / 100 / 12;
        const n = lengthOfLoan * 12;

        const mortgage =
            (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

        setIsSubmitted(mortgage);
    };

    return (
        <div className="main-container">
            <h1>Monthly Mortgage Calculator</h1>
            <div>
                <h2>Principle Loan Amount</h2>
                <input
                    type="text"
                    name="amount"
                    onChange={(e) => {
                        setPrinciple(Number(e.target.value));
                    }}
                />
            </div>
            <div>
                <h2>Interest Rate</h2>
                <input
                    type="text"
                    name="rate"
                    onChange={(e) => {
                        setMonthlyInterestRate(Number(e.target.value));
                    }}
                />
                <span> %</span>
            </div>
            <div>
                <h2>Length of Loan</h2>
                <input
                    type="text"
                    name="length"
                    onChange={(e) => {
                        setLengthOfLoan(Number(e.target.value));
                    }}
                />
                <span> years</span>
            </div>
            <button onClick={calculate}>Calculate</button>
            {isSubmitted && (
                <p>{`Your monthly mortgage payment will be $${Math.floor(
                    isSubmitted
                ).toLocaleString()}`}</p>
            )}
        </div>
    );
};

export default Mortgage;
