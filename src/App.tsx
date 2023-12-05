import "./App.css";
import Countdown from "./challenges/COUNTDOWN/Countdown";
import FAQComponent from "./challenges/FAQ/Faq";
import map from "./challenges/array.map";

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
        <>
            <FAQComponent questions={FAQ} />
            <Countdown />
        </>
    );
}

export default App;
