import { useState } from "react";
import "./MultiStepForm.css";

const MultiStepForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [onForm, setOnForm] = useState("NAME");
    const [fullForm, setFullForm] = useState<null | object>(null);

    const handleSubmit = () => {
        const submitted = {
            name: name,
            email: email,
            dateOfBirth: dateOfBirth,
            password: password,
        };

        setFullForm(submitted);
    };

    return (
        <div>
            <div>
                <h1>Multi-Step Form</h1>
            </div>
            <div className="main-container">
                {onForm === "NAME" && (
                    <div className="form-container">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <button
                            onClick={() => setOnForm("EMAIL")}
                            disabled={name ? false : true}
                        >
                            Next
                        </button>
                    </div>
                )}

                {onForm === "EMAIL" && (
                    <div className="form-container">
                        <button
                            onClick={() => {
                                setEmail("");
                                setOnForm("NAME");
                            }}
                        >
                            Back
                        </button>
                        <label>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={() => setOnForm("DATE")}
                            disabled={email ? false : true}
                        >
                            Next
                        </button>
                    </div>
                )}

                {onForm === "DATE" && (
                    <div className="form-container">
                        <button
                            onClick={() => {
                                setDateOfBirth("");
                                setOnForm("EMAIL");
                            }}
                        >
                            Back
                        </button>
                        <label>Date of Birth</label>
                        <input
                            type="text"
                            placeholder="mm/dd/yy"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                        <button
                            onClick={() => setOnForm("PASSWORD")}
                            disabled={dateOfBirth ? false : true}
                        >
                            Next
                        </button>
                    </div>
                )}

                {onForm === "PASSWORD" && (
                    <div className="form-container">
                        <button
                            onClick={() => {
                                setDateOfBirth("");
                                setOnForm("BIRTH");
                            }}
                        >
                            Back
                        </button>
                        <label>Password</label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={password ? false : true}
                        >
                            Submit
                        </button>
                    </div>
                )}

                {fullForm && (
                    <div>
                        <h2>Success!!!</h2>
                        <div>
                            <h3>{fullForm.name}</h3>
                            <h3>{fullForm.email}</h3>
                            <h3>{fullForm.dateOfBirth}</h3>
                            <h3>{fullForm.password}</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;
