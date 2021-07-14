import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// redux:
import { Provider, connect } from "react-redux";
// store:
import { store } from "./store";
// components:
import MainContainer from "./components/mainContainer/MainContainer";
import LoginScreen from "./components/loginScreen/LoginScreen";
// styles:
import "./app.scss";
// database:
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// api:
import { initializeApp, authStateListener } from "./api";
import { Actions } from "./actionCreators";

const App = ({ logged, saveFirebaseToStore, authStateListener }) => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        initializeApp(firebase, setInitialized);
        saveFirebaseToStore(firebase);
    }, []);

    useEffect(() => {
        initialized && authStateListener();
    }, [initialized]);

    return (
        initialized && (
            <Router>
                <Route exact path="/login">
                    {logged && <Redirect to="/" />}
                    <LoginScreen />
                </Route>
                <Route exact path="/">
                    {!logged && <Redirect to="/login" />}
                    <MainContainer />
                </Route>
            </Router>
        )
    );
};

const mapStateToProps = (state) => ({
    logged: state.database.logged,
});
const mapDispatchToProps = (dispatch) => ({
    saveFirebaseToStore: () => dispatch(Actions.saveFirebaseToStore(firebase)),
    authStateListener: authStateListener(dispatch),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.querySelector("#app")
);
