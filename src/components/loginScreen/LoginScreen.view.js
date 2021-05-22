import React, { useState } from "react";
// functions:
import { refreshState } from "../../functions";

const LoginScreen = ({ authenticate, createUser, error }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [newLogin, setNewLogin] = useState("");
    const [newPassword, setNewPassword] = useState("");

    return (
        <div className="login-screen">
            <h1>Zaloguj się</h1>
            <form
                className="login-screen__form"
                onSubmit={authenticate(login, password)}
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
            <h1>Zalóż konto</h1>
            <form
                className="login-screen__form"
                onSubmit={createUser(newLogin, newPassword)}
            >
                <div className="form__row">
                    <label className="form__label" htmlFor="email">
                        Adres email konta:
                    </label>
                    <input
                        id="emailn"
                        name="emailn"
                        type="emailn"
                        className="form__input"
                        value={newLogin}
                        onChange={refreshState(setNewLogin)}
                        placeholder="email"
                    />
                </div>
                <div className="form__row">
                    <label className="form__label" htmlFor="password">
                        Hasło:
                    </label>
                    <input
                        id="passwordn"
                        name="passwordn"
                        type="passwordn"
                        className="form__input"
                        value={newPassword}
                        onChange={refreshState(setNewPassword)}
                        placeholder="hasło"
                    />
                </div>
                <button type="submit" className="form__submit">
                    Załóż konto
                </button>
            </form>
            <div className="error-message">
                {error && "Niepoprawny email i / lub hasło"}
            </div>
        </div>
    );
}

export default LoginScreen;