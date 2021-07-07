// redux:
import { connect } from "react-redux";
// view:
import FocusWeekToggles from "./FocusWeekToggles.view";
// actions:
import { Actions } from "../../../../actionCreators";

const mapStateToProps = (state) => {
    return {
        focusWeekClass: state.date.focusWeek !== -1 ? " focused" : "",
        focusWeek: state.date.focusWeek,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setFocusWeek: (week) => dispatch(Actions.focusViewOnWeek(week)),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(FocusWeekToggles);

export default Container;
