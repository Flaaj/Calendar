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
