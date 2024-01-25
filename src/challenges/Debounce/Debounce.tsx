import { useEffect } from "react";

export function debounce(callback: () => unknown, interval: number) {
    if (!callback || !interval) throw new Error("Ain't Good");
    let timeout: number;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(callback, interval);
    };
}

const Debounce = () => {
    const myCallback = () => console.log("Hello");
    const myDebouncedCallback = debounce(myCallback, 1000);

    useEffect(() => {
        // call function immediately (after 0ms)
        myDebouncedCallback();

        // call function after 100ms
        setTimeout(myDebouncedCallback, 100);

        // call function after 500ms
        setTimeout(myDebouncedCallback, 500);

        // call function after 2000ms
        setTimeout(myDebouncedCallback, 2000);

        // call function after 4000ms
        setTimeout(myDebouncedCallback, 4000);
    }, []);

    return <h1 style={{ alignSelf: "center" }}>Debounce</h1>;
};

export default Debounce;
