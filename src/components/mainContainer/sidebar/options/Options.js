// redux:
import { connect } from "react-redux";
// view:
import Options from "./Options.view";

const mapStateToProps = (state) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const { firebase, user } = state.database;
        const { uid } = user;
        const freeTermsDays = state.options.freeTermsDays;
        const upcomingDays = state.options.upcomingDays;

        firebase.database().ref(`users/${uid}/options`).set({
            freeTermsDays,
            upcomingDays,
        }).then(console.log("sukces")).catch(console.log("failed lol"));
    };

    return {
        freeTermsDays: state.options.freeTermsDays,
        upcomingDays: state.options.upcomingDays,
        onSubmit,
    };
};

const mapDispatchToProps = (dispatch) => {
    const handleChange = (dispatch) => (option) => (e) => {
        const value = e.target.value;
        dispatch({
            type: "option/update",
            payload: {
                option,
                value,
            },
        });
    };

    return {
        handleChange: handleChange(dispatch),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Options);

export default Container;
