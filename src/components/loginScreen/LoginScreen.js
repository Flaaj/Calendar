import React, { useState } from "react";
// functions:
import { refreshState } from "../../functions";
// api:
import { authenticate } from "../../api";

const LoginScreen = ({ firebase, setUser }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    return (
        <div className="login-screen">
            <h1>Zaloguj się</h1>
            <form
                className="login-screen__form"
                onSubmit={authenticate(firebase, login, password, setUser, setError)}
            >
                <div className="form__row">
                    <label className="form__label" htmlFor="email">
                        Adres email konta:
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form__input"
                        value={login}
                        onChange={refreshState(setLogin)}
                        placeholder="email"
                    />
                </div>
                <div className="form__row">
                    <label className="form__label" htmlFor="password">
                        Hasło:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="form__input"
                        value={password}
                        onChange={refreshState(setPassword)}
                        placeholder="hasło"
                    />
                </div>
                <button type="submit" className="form__submit">
                    Zaloguj
                </button>
            </form>
            <div className="error-message">
                {error && "Niepoprawny email i / lub hasło"}
            </div>
        </div>
    );
};

export default LoginScreen;
