import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropright } from "react-icons/io";
import "./Faq.css";

type Question = {
    question: string;
    answer: string;
};

interface FAQComponentProps {
    questions: Question[];
}

const FAQComponent = ({ questions }: FAQComponentProps) => {
    const [isOpen, setIsOpen] = useState<number | null>(0);
    return (
        <div className="main-container">
            <h1>Frequently Asked Questions</h1>
            {questions.map((question, index) => (
                <div className="faq-container" key={index}>
                    <div
                        className="questions-container"
                        onClick={() => {
                            isOpen === index
                                ? setIsOpen(null)
                                : setIsOpen(index);
                        }}
                    >
                        {isOpen === index ? (
                            <IoIosArrowDropdown className="cheveron" />
                        ) : (
                            <IoIosArrowDropright className="cheveron" />
                        )}
                        <div>{question.question}</div>
                    </div>
                    {isOpen === index && <div>{question.answer}</div>}
                </div>
            ))}
        </div>
    );
};

export default FAQComponent;
