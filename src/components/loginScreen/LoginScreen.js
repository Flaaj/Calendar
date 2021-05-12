import React, { useState } from "react";
// styles :
import "./loginScreen.scss";

const LoginScreen = ({ firebase, setUser }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const authenticate = (login, password) => (e) => {
        e.preventDefault();
        setError(false);
        firebase
            .auth()
            .signInWithEmailAndPassword(login, password)
            .then(({ user }) => {
                setUser(user);
                console.log("Hello World!");
            })
            .catch(({ code, message }) => {
                console.log(code, message);
                setError(true);
            });
    };

    const refreshState =
        (setState) =>
        ({ target: { value } }) => {
            setState(value);
        };

    return (
        <div className="login-screen">
            <h1>Zaloguj się</h1>
            <form className="login-screen__form" onSubmit={authenticate(login, password)}>
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
            <div className="error-message">{error && "Niepoprawny email i / lub hasło"}</div>
        </div>
    );
};

export default LoginScreen;
