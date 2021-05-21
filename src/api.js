import { store } from "./store"
// functions:
import { getRefFromDateObject } from "./functions";
// config:
const firebaseConfig = require("../firebase.config.json");

export const initializeApp = (firebase, setInitialized) => {
    firebase.initializeApp(firebaseConfig);
    setInitialized(true);
};

export const authStateListener = (firebase, setUser) => {
    firebase.auth().onAuthStateChanged((user) => setUser(user));
};


export const logOut = () => {
    const { firebase } = store.getState().database
    firebase.auth().signOut();
};

export const deleteAppointment = (firebase, date, id) => {
    firebase
        .database()
        .ref(getRefFromDateObject(date, id))
        .remove()
        .catch((err) => console.log(err));
};

export const addNewAppointment = async (target, body) => {
    const { firebase } = store.getState().database
    const response = await firebase.database().ref(target).get();
    const data = await response.val();
    const usedTimeWindows = [];
    for (const id in data) {
        usedTimeWindows.push(...data[id].timeWindows);
    }

    if (body.timeWindows.some((t) => usedTimeWindows.includes(t))) {
        alert("Ten czas jest już zarezerwowany");
    } else {
        firebase
            .database()
            .ref(target)
            .push(body)
            .catch((err) => console.log(err));
    }
};

export const updateAppointment = (firebase, date, id, body) => {
    firebase
        .database()
        .ref(getRefFromDateObject(date, id))
        .update(body)
        .catch((err) => console.log(err));
};

export const sendMessage =
    (firebase, messageToSend, setMessageToSend) => (e) => {
        e.preventDefault();
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
