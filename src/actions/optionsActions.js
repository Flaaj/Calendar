import { store } from "../store";

export const getOptions = (dispatch, user) => {
    const { firebase } = store.getState().database;
    firebase.database().ref(`users/${user.uid}`).get().then(snapshot => {
        if (snapshot.exists()) {
            dispatch({
                type: "options/get",
                payload: snapshot.val().options
            })
        } else {
            console.log("No data available");
        }
    })
};
