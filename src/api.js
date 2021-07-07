import { store } from "./store";
// functions:
import { getRefFromDateObject } from "./functions";
// config:
const firebaseConfig = require("../firebase.config.json");
// Actions:
import { Actions } from "./actionCreators";

export const initializeApp = (firebase, setInitialized) => {
    firebase.initializeApp(firebaseConfig);
    setInitialized(true);
};

export const authenticate = (dispatch) => (login, password) => (e) => {
    e.preventDefault();
    const { firebase } = store.getState().database;
    dispatch(Actions.prelogin());
    firebase
        .auth()
        .signInWithEmailAndPassword(login, password)
        .then(({ user }) => {
            dispatch(Actions.loginSuccessful(user));
        })
        .catch(({ code, message }) => {
            console.log(code, message);
            dispatch(Actions.loginFailed());
        });
};

export const logOut = () => {
    const { firebase } = store.getState().database;
    firebase.auth().signOut();
};

export const createUser = (dispatch) => (login, password) => (e) => {
    e.preventDefault();
    const { firebase } = store.getState().database;
    if (
        password.length < 8 ||
        !password.split("").some((letter) => letter.charCodeAt(0) < 91 && letter.charCodeAt(0) > 64) ||
        !password.split("").some((letter) => letter.charCodeAt(0) < 123 && letter.charCodeAt(0) > 96) ||
        !password.split("").some((letter) => letter.charCodeAt(0) < 58 && letter.charCodeAt(0) > 47)
    ) {
        alert(
            "hasło musi miec przynajmniej 8 znaków, zawierać przynajmniej " +
            "jedną duża literę, przynajmnij jedną małą literę i przynajmniej jedną cyfrę "
        );
    } else {
        firebase
            .auth()
            .createUserWithEmailAndPassword(login, password)
            .catch((err) => console.log(err));
    }
};

export const authStateListener = (dispatch) => () => {
    const { firebase } = store.getState().database;
    firebase.auth().onAuthStateChanged((user) => {
        firebase
            .database()
            .ref(`users/${user.uid}`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(Actions.getUserOptions(snapshot.val().options));
                } else {
                    console.log("No data available");
                }
            });

        dispatch(Actions.authStateChange(user));
    });
};

export const queryMonthsToListen = (dispatch) => (month, year) => {
    const { firebase, data } = store.getState().database;
    const monthsToQuery =
        month === 1
            ? [
                [12, year - 1],
                [1, year],
                [2, year],
            ]
            : month === 12
                ? [
                    [11, year],
                    [12, year],
                    [1, year + 1],
                ]
                : [
                    [month - 1, year],
                    [month, year],
                    [month + 1, year],
                ];

    monthsToQuery.forEach(([month, year]) => {
        const target = `${year}/${month}`;
        if (!data[target]) {
            firebase
                .database()
                .ref(target)
                .on("value", (snapshot) => {
                    if (snapshot.val()) {
                        dispatch(Actions.updateData(target, snapshot.val()));
                    } else {
                        dispatch(Actions.updateData(target, true));
                    }
                });
        }
    });
};

export const addNewAppointment = async (target, body) => {
    const { firebase } = store.getState().database;
    firebase
        .database()
        .ref(target)
        .push(body)
        .catch((err) => console.log(err));
};

export const deleteAppointment = () => {
    const {
        date: {
            chosenAppointment: { date, id },
        },
        database: { firebase },
    } = store.getState();

    firebase
        .database()
        .ref(getRefFromDateObject(date, id))
        .remove()
        .catch((err) => console.log(err));
};

export const updateAppointment = (appointment, body) => {
    const { date, id } = appointment;
    const { firebase } = store.getState().database;

    firebase
        .database()
        .ref(getRefFromDateObject(date, id))
        .update(body)
        .catch((err) => console.log(err));
};

export const messageListener = (dispatch) => () => {
    const { firebase, messages } = store.getState().database;
    if (messages.length === 0) {
        firebase
            .database()
            .ref("messages")
            .on("value", (snapshot) => {
                if (snapshot.val()) {
                    const messagesData = Object.entries(snapshot.val());
                    dispatch(Actions.updateMessages(messagesData));
                } else {
                    const placeholderObject = { empty: true };
                    dispatch(Actions.updateMessages(placeholderObject));
                }
            });
    }
};

export const sendMessage = (messageToSend, setMessageToSend) => (e) => {
    e.preventDefault();
    const { firebase } = store.getState().database;

    if (messageToSend) {
        const body = {
            user: firebase.auth().currentUser.email,
            date: new Date().getTime(),
            msg: messageToSend,
        };
        firebase
            .database()
            .ref("messages")
            .push(body)
            .then(() => {
                setMessageToSend("");
            });
    }
};

export const deleteMessage = (id) => (e) => {
    e.preventDefault();
    const { firebase } = store.getState().database;

    firebase
        .database()
        .ref(`messages/${id}`)
        .remove()
        .then(() => {
            console.log("deleted");
        });
};
