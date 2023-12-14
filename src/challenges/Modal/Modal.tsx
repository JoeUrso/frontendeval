import { useState } from "react";
import "./Modal.css";

const Modal = () => {
    const [showModal, setShowModal] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        callback: { (): void; (): void; (): void; (): void }
    ) => {
        event.stopPropagation();
        callback();
    };

    return (
        <div
            className={
                showModal ? "modal-main-container-show" : "modal-main-container"
            }
            onClick={() => {
                setShowModal(false);
            }}
        >
            {!showModal && !accepted && (
                <button
                    onClick={(event) => {
                        handleClick(event, () => setShowModal(true));
                    }}
                    className="show-offer-button"
                >
                    Show Offer
                </button>
            )}
            {showModal && (
                <div className="modal">
                    <button
                        onClick={(event) => {
                            handleClick(event, () => setShowModal(false));
                        }}
                        className="close-button"
                    >
                        X
                    </button>
                    <div>
                        <p>
                            Click the button below to accept our amazing offer!
                        </p>
                        <button
                            onClick={(event) => {
                                handleClick(event, () => {
                                    setShowModal(false);
                                    setAccepted(true);
                                });
                            }}
                        >
                            Accept Offer
                        </button>
                    </div>
                </div>
            )}
            {!showModal && accepted && <div>Offer Accepted!</div>}
        </div>
    );
};

export default Modal;
