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