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

export const authenticate =
    (firebase, login, password, setUser, setError) => (e) => {
        e.preventDefault();
        setError(false);
        firebase
            .auth()
            .signInWithEmailAndPassword(login, password)
            .then(({ user }) => {
                setUser(user);
            })
            .catch(({ code, message }) => {
                console.log(code, message);
                setError(true);
            });
    };

export const logOut = (firebase) => {
    firebase.auth().signOut();
};

export const deleteAppointment = (firebase, date, id) => {
    firebase
        .database()
        .ref(getRefFromDateObject(date, id))
        .remove()
        .catch((err) => console.log(err));
};

export const addNewAppointment = async (firebase, target, body) => {
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
    console.log(getRefFromDateObject(date, id));
    console.log(body);
    firebase
        .database()
        .ref(getRefFromDateObject(date, id))
        .update(body)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.log(err));
};

export const queryMonthsToListen = (firebase, month, year, data, setData) => {
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
                        setData((data) => ({
                            ...data,
                            [target]: snapshot.val(),
                        }));
                    } else {
                        setData((data) => ({
                            ...data,
                            [target]: true,
                        }));
                    }
                });
        }
    });
};

export const messageListener = (firebase, setMessages) => {
    firebase
        .database()
        .ref("messages")
        .on("value", (snapshot) => {
            if (snapshot.val()) {
                setMessages(Object.entries(snapshot.val()));
            }
        });
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
