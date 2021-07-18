import React, { useEffect } from "react";
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
// api:
import { initializeApp } from "./api";

const App = ({ userLoggedIn, appInitialized }) => {
    useEffect(initializeApp, []);

    return (
        appInitialized && (
            <Router>
                <Route exact path="/login">
                    {userLoggedIn && <Redirect to="/" />}
                    <LoginScreen />
                </Route>
                <Route exact path="/">
                    {!userLoggedIn && <Redirect to="/login" />}
                    <MainContainer />
                </Route>
            </Router>
        )
    );
};

const mapStateToProps = (state) => ({
    userLoggedIn: state.database.logged,
    appInitialized: state.database.initialized,
});

const Container = connect(mapStateToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.querySelector("#app")
);
