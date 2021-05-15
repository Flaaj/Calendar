import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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

const App = () => {
    const [user, setUser] = useState();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        initializeApp(firebase, setInitialized);
    }, []);

    useEffect(() => {
        initialized && authStateListener(firebase, setUser);
    }, [initialized]);

    return (
        <Router>
            {initialized && (
                <>
                    <Route exact path="/login">
                        {user && <Redirect to="/" />}
                        <LoginScreen firebase={firebase} setUser={setUser} />
                    </Route>
                    <Route exact path="/">
                        {!user && <Redirect to="/login" />}
                        <Calendar firebase={firebase} setUser={setUser} />
                    </Route>
                </>
            )}
        </Router>
    );
};

ReactDOM.render(<App />, document.querySelector("#app"));
