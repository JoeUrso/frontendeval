import { useCallback, useEffect, useState } from "react";
import "./MemoryGame.css";

type Card = [number, number];

function shuffleArray(array: Card[]): Card[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const numberOfCards = 18;

const MemoryGame = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [matched, setMatched] = useState(new Map());

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [firstCard, secondCard] = selectedCards;
            if (firstCard[0] !== secondCard[0]) {
                setTimeout(() => {
                    setSelectedCards([]);
                }, 3000);
            } else {
                setTimeout(() => {
                    setMatched(
                        (prevMatched) =>
                            new Map(prevMatched.set(firstCard[0], 1))
                    );
                    setSelectedCards([]);
                }, 3000);
            }
        }
    }, [selectedCards]);

    useEffect(() => {
        const newCards: Card[] = [];
        for (let i = 1; i <= numberOfCards; i++) {
            newCards.push([i, Math.random()]);
            newCards.push([i, Math.random()]);
        }
        setCards(shuffleArray(newCards));
    }, []);

    const selectCard = useCallback(
        (card: Card) => {
            if (selectedCards.length < 2) {
                setSelectedCards((prevCards) => [...prevCards, card]);
            }
        },
        [selectedCards]
    );

    const resetGame = () => {
        setSelectedCards([]);
        setMatched(new Map());
        const newCards: Card[] = [];
        for (let i = 1; i <= numberOfCards; i++) {
            newCards.push([i, Math.random()]);
            newCards.push([i, Math.random()]);
        }
        setCards(shuffleArray(newCards));
    };

    return (
        <div className="memory-game-container">
            <h1>Memory Game</h1>
            {matched.size !== numberOfCards ? (
                <div className="card-container">
                    {cards.map((card) => {
                        const isSelected = selectedCards.find(
                            (selectedCard) => selectedCard[1] === card[1]
                        );
                        const isMatched = matched.has(card[0]);
                        return (
                            <div
                                className={
                                    isSelected
                                        ? "selected-card"
                                        : "non-selected-card"
                                }
                                onClick={() => selectCard(card)}
                                style={
                                    isMatched ? { visibility: "hidden" } : {}
                                }
                                aria-label={
                                    isSelected
                                        ? `Card ${card[0]}`
                                        : "Hidden Card"
                                }
                            >
                                {isSelected && <h2>{card[0]}</h2>}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <button className="custom-button" onClick={resetGame}>
                    Play Again
                </button>
            )}
        </div>
    );
};

export default MemoryGame;
