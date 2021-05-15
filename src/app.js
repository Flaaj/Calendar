import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// redux:
import { Provider, connect } from "react-redux";
// store:
import { store } from "./store";
// actions :
import { saveFirebaseToStore } from "./actions/databaseActions";
// components:
import Calendar from "./components/calendar/Calendar";
import LoginScreen from "./components/loginScreen/LoginScreen";
// styles:
import "./app.scss";
// database:
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// api:
import { initializeApp, authStateListener } from "./api";

const App = ({ saveFirebaseToStore }) => {
    const [user, setUser] = useState();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        initializeApp(firebase, setInitialized);
        saveFirebaseToStore(firebase)
    }, []);

    useEffect(() => {
        initialized && authStateListener(firebase, setUser);
    }, [initialized]);

    return (
        initialized && (
            <Router>
                <Route exact path="/login">
                    {user && <Redirect to="/" />}
                    <LoginScreen firebase={firebase} setUser={setUser} />
                </Route>
                <Route exact path="/">
                    {!user && <Redirect to="/login" />}
                    <Calendar firebase={firebase} setUser={setUser} />
                </Route>
            </Router>
        )
    );
};
const mapStateToProps = (state) => ({
    user: state.database.user
});
const mapDispatchToProps = (dispatch) => ({
    saveFirebaseToStore: saveFirebaseToStore(dispatch),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.querySelector("#app")
);
