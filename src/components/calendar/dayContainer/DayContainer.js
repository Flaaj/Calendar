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
    const data = state.database.data[target] ? state.database.data[target][day] : {};
    const { id } = state.date.chosenAppointment;

    return {
        data,
        isTodayClass: isToday ? " today" : "",
        isCurrentMonthClass: isCurrentMonth ? " current-month" : "",
        displayDetails: data && data[id],
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
