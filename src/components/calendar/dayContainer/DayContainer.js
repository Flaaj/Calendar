// redux:
import { connect } from "react-redux";
// view:
import DayContainer from "./DayContainer.view";
// functions:
import { getTarget } from "../../../functions";

const mapStateToProps = (state, props) => {
    const { date, isCurrentMonth } = props;

    const { target, day, dateString } = getTarget(date);

    const isToday = state.date.today === dateString;

    return {
        data: state.database.data[target] ? state.database.data[target][day] : {},
        firebase: state.database.firebase,
        chosenAppointment: state.date.chosenAppointment,
        isTodayClass: isToday ? " today" : "",
        isCurrentMonthClass: isCurrentMonth ? " current-month" : "",
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setChosenAppointment: (id) =>
            dispatch({
                type: "appointment/choose",
                payload: id,
            }),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(DayContainer);

export default Container;
