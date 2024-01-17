import { ChangeEvent, useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import "./ShoppingList.css";

type Item = { id: number; item: string; checked: boolean };

const ShoppingList = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [delay, setDelay] = useState(true);
    const [list, setList] = useState<Item[]>([]);

    useEffect(() => {
        if (search.length < 2) {
            setDelay(true);
            setResults([]);
        }

        if (search.length >= 2 && !delay) {
            fetch(`https://api.frontendeval.com/fake/food/${search}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => setResults(data))
                .catch((error) => {
                    console.error(
                        "There has been a problem with your fetch operation: ",
                        error
                    );
                });
        }

        if (delay) {
            setTimeout(() => {
                setDelay(false);
            }, 500);
        }
    }, [search, delay]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setDelay(true);
    };

    const addToList = (item: string) => {
        const newItem = {
            id: Math.random(),
            item: item,
            checked: false,
        };
        setList((prev) => [newItem, ...prev]);
        setSearch("");
        setResults([]);
    };

    const deleteFromList = (itemId: number) => {
        const newList = list.filter((item) => item.id !== itemId);
        setList(newList);
    };

    const check = (checkedItem: Item) => {
        const newList = list.map((item) => {
            if (checkedItem.id === item.id) {
                return { ...item, checked: true };
            }
            return item;
        });
        setList(newList);
    };

    const uncheck = (uncheckedItem: Item) => {
        const newList = list.map((item) => {
            if (uncheckedItem.id === item.id) {
                return { ...item, checked: false };
            }
            return item;
        });
        setList(newList);
    };

    return (
        <div className="shopping-list-container">
            <h1>My Shopping List</h1>
            <input
                type="search"
                onChange={(e) => {
                    handleSearch(e);
                }}
                value={search}
                className="search-bar"
            />
            <div
                className={
                    search.length >= 2 && results.length > 0
                        ? "results-container"
                        : ""
                }
            >
                {results.map((result) => {
                    return (
                        <div
                            onClick={() => {
                                addToList(result);
                            }}
                            className="result"
                        >
                            {result}
                        </div>
                    );
                })}
            </div>
            <div className="list-container">
                {list.map((item) => {
                    return (
                        <div className="list-item-container">
                            {item.checked ? (
                                <>
                                    <div className="check-item-container">
                                        <FaCheck
                                            onClick={() => {
                                                uncheck(item);
                                            }}
                                            className="check"
                                        />
                                        <div className="checked-item">
                                            {item.item}
                                        </div>
                                    </div>
                                    <TiDelete
                                        className="delete-item"
                                        size={24}
                                        onClick={() => deleteFromList(item.id)}
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="check-item-container">
                                        <CiCircleCheck
                                            size={24}
                                            onClick={() => {
                                                check(item);
                                            }}
                                            className="check"
                                        />
                                        <div>{item.item}</div>
                                    </div>
                                    <TiDelete
                                        className="delete-item"
                                        size={24}
                                        onClick={() => deleteFromList(item.id)}
                                    />
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShoppingList;
