import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// redux:
import { Provider, connect } from "react-redux";
// store:
import { store } from "./store";
// actions :
import { saveFirebaseToStore, authStateListener } from "./actions/databaseActions";
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
import { initializeApp } from "./api";

const App = ({ user, saveFirebaseToStore, authStateListener }) => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        initializeApp(firebase, setInitialized);
        saveFirebaseToStore(firebase);
    }, []);

    useEffect(() => {
        initialized && authStateListener();
    }, [initialized]);

    return initialized && <MainContainer />;
};

const mapStateToProps = (state) => ({
    user: state.database.user,
});
const mapDispatchToProps = (dispatch) => ({
    saveFirebaseToStore: saveFirebaseToStore(dispatch),
    authStateListener: authStateListener(dispatch),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.querySelector("#app")
);
