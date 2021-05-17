import { store } from "../store";

export const saveFirebaseToStore = (dispatch) => (firebase) => {
    dispatch({
        type: "firebase/save",
        payload: firebase,
    });
};

export const authenticate = (dispatch) => (login, password) => (e) => {
    e.preventDefault();
    const { firebase } = store.getState().database;
    dispatch({
        type: "firebase/prelogin",
    });
    firebase
        .auth()
        .signInWithEmailAndPassword(login, password)
        .then(({ user }) => {
            dispatch({
                type: "firebase/login-succesful",
                payload: user,
            });
        })
        .catch(({ code, message }) => {
            console.log(code, message);
            dispatch({
                type: "firebase/login-failed",
            });
        });
};

export const authStateListener = (dispatch) => () => {
    const { firebase } = store.getState().database;
    firebase.auth().onAuthStateChanged((user) =>
        dispatch({
            type: "firebase/auth-state-change",
            payload: user,
        })
    );
};

export const messageListener = (dispatch) => () => {
    const { firebase, messages } = store.getState().database;
    if (messages.length === 0) {
        firebase
            .database()
            .ref("messages")
            .on("value", (snapshot) => {
                if (snapshot.val()) {
                    dispatch({
                        type: "messages/update",
                        payload: Object.entries(snapshot.val()),
                    });
                } else {
                    dispatch({
                        type: "messages/update",
                        payload: { empty: true },
                    });
                }
            });
    }
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
                        dispatch({
                            type: "data/update",
                            payload: {
                                target,
                                data: snapshot.val(),
                            },
                        });
                    } else {
                        dispatch({
                            type: "data/update",
                            payload: {
                                target,
                                data: true,
                            },
                        });
                    }
                });
        }
    });
};
