import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from "react-router-dom";
// components:
import Calendar from "./components/calendar/Calendar";
import LoginScreen from "./components/loginScreen/LoginScreen";
// styles:
import "./app.scss";
//database:
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const App = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyBSIbJAQ8-e8GeW1EZdvZZNbi34PU29fYI",
            authDomain: "kalendarzmechanik.firebaseapp.com",
            databaseURL:
                "https://kalendarzmechanik-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "kalendarzmechanik",
            storageBucket: "kalendarzmechanik.appspot.com",
            messagingSenderId: "854800916273",
            appId: "1:854800916273:web:61894c654b5041c1adda10",
            measurementId: "G-RV8HDHW5SC",
        };

        firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged((user) => {
            user && setUser(user);
        });
    }, []);

    return (
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
    );
};

ReactDOM.render(<App />, document.querySelector("#app"));
