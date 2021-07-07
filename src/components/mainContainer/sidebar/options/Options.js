// redux:
import { connect } from "react-redux";
import { Actions } from "../../../../actionCreators";
// view:
import Options from "./Options.view";

const mapStateToProps = (state) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const { firebase, user } = state.database;
        const { uid } = user;
        const freeTermsDays = state.options.freeTermsDays;
        const upcomingDays = state.options.upcomingDays;

        firebase
            .database()
            .ref(`users/${uid}/options`)
            .set({
                freeTermsDays,
                upcomingDays,
            })
            .then(console.log("sukces"))
            .catch((err) => console.log(err));
    };

    return {
        freeTermsDays: state.options.freeTermsDays,
        upcomingDays: state.options.upcomingDays,
        onSubmit,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (optionName) => (e) => {
            const { value } = e.target;
            dispatch(Actions.updateOption(optionName, value));
        },
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Options);

export default Container;
