import { store } from "./store";
// functions:
import { getRefFromDateObject } from "./functions";
// config:
const firebaseConfig = require("../firebaseportfolio.config.json");

export const initializeApp = (firebase, setInitialized) => {
    firebase.initializeApp(firebaseConfig);
    setInitialized(true);
};

export const logOut = () => {
    const { firebase } = store.getState().database;
    firebase.auth().signOut();
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

export const addNewAppointment = async (target, body) => {
    const { firebase } = store.getState().database;
    firebase
        .database()
        .ref(target)
        .push(body)
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

export const sendMessage = (messageToSend, setMessageToSend) => (e) => {
    e.preventDefault();
    const { firebase } = store.getState().database;

    if (messageToSend) {
        const body = {
            // user: firebase.auth().currentUser.email,
            user: "Random user no." + ~~(Math.random() * 1000000000),
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
