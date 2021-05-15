import React, { useState } from "react";
// redux:
import { connect } from "react-redux";
// actions:
import { authenticate } from "../../actions/databaseActions";
// functions:
import { refreshState } from "../../functions";
// api:
// import { authenticate } from "../../api";

const LoginScreen = ({ authenticate, error }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

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
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.database.user,
    error: state.database.error,
});
const mapDispatchToProps = (dispatch) => ({
    authenticate: authenticate(dispatch),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export default Container;
