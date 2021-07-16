import React, { useState } from "react";
// functions:
import { refreshState } from "../../functions";
// style:
import "./_loginScreen.scss";
// api:
import { authenticate } from "../../api";

const LoginScreen = ({ error }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login-screen">
            <div className="wrapper">
                <h1 className="heading">Zaloguj się</h1>
                <form className="form" onSubmit={authenticate(login, password)}>
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
                    {error && <div className="error-message">Niepoprawny email i / lub hasło</div>}
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
