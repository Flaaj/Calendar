// redux:
import { connect } from "react-redux";
// view:
import DayContainer from "./DayContainer.view";
// functions:
import { getTarget, sortAppointmentsDataByTime, getAppointmentsGridColSpan } from "../../../../functions";
import { Actions } from "../../../../actionCreators";

const mapStateToProps = (state, props) => {
    const { date, isCurrentMonth } = props;

    const { target, day, dateString } = getTarget(date);

    const isToday = state.date.today === dateString;

    const appointmentsData =
        state.database.data[target] && state.database.data[target][day] ? state.database.data[target][day] : {};
    const sortedData = sortAppointmentsDataByTime(appointmentsData);

    const chosenAppointmentId = state.date.chosenAppointment.id;
    // get array of appointment blocks widths (for instance if there are two appointments at the same time, each of them will have width of 6 - half of total of 12 columns)
    const appointmentsGridColSpan = appointmentsData ? getAppointmentsGridColSpan(sortedData) : [];

    return {
        data: sortedData,
        isTodayClass: isToday ? " today" : "",
        isCurrentMonthClass: isCurrentMonth ? " current-month" : "",
        displayDetails: appointmentsData && appointmentsData[chosenAppointmentId],
        appointmentsGridColSpan,
        isFullScreen: dateString == state.date.chosenDay,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setChosenAppointment: (id) => dispatch(Actions.chooseAppointment(id)),
        setChosenDay: (day) => dispatch(Actions.chooseDay(day)),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(DayContainer);

export default Container;
