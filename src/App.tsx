import "./App.css";
import Countdown from "./challenges/Countdown/Countdown";
import FAQComponent from "./challenges/Faq/Faq";
import MemoryGame from "./challenges/MemoryGame/MemoryGame";
import Modal from "./challenges/Modal/Modal";
import Mortgage from "./challenges/MortagageCalculator/MortgageCalculator";
import map from "./challenges/map";

const FAQ = [
    {
        question: "How many bones does a cat have?",
        answer: "A cat has 230 bones - 6 more than a human",
    },
    {
        question: "How much do cats sleep?",
        answer: "The average cat sleeps 12-16 hours per day",
    },
    {
        question: "How long do cats live",
        answer: "Outdoor cats live 5 years on average. Indoor cats live 15 years on average.",
    },
];

function App() {
    const mappedArray = map([1, 2, 3, 4, 5], (x) => x * 2);
    console.log(mappedArray);

    return (
        <div className="app">
            <FAQComponent questions={FAQ} />
            <Countdown />
            <Mortgage />
            <Modal />
            <MemoryGame />
        </div>
    );
}

export default App;
