// functions:
import { getRefFromDateObject } from "./functions";
// config:
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

export const initializeApp = (firebase, setUser) => {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
        user && setUser(user);
    });
};

export const authenticate = (firebase, login, password, setUser) => (e) => {
    e.preventDefault();
    setError(false);
    firebase
        .auth()
        .signInWithEmailAndPassword(login, password)
        .then(({ user }) => {
            setUser(user);
            console.log("Hello World!");
        })
        .catch(({ code, message }) => {
            console.log(code, message);
            setError(true);
        });
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
    console.log(getRefFromDateObject(date, id))
    console.log(body)
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
