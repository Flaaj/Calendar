// redux:
import { connect } from "react-redux";
// view:
import Appointment from "./Appointment.view";
// functions:
import { getTarget } from "../../../../../functions";
// actions:
import { Actions } from "../../../../../actionCreators";

const mapStateToProps = (state, props) => {
    // getting the appointment data from state, using date given in props to get store position:
    const { date, id, isFullScreen, gridColSpan } = props;
    const { target, day } = getTarget(date);
    const data = state.database.data[target][day][id];
    const { timeWindows, color } = data;
    // getting the appointment duration in a form of length of time windows:
    const blockSize = timeWindows.length;
    // getting the start end ending position of appointment box on the grid:
    const [gridStart, gridEnd] = [timeWindows[0], timeWindows[blockSize - 1]];
    // determining the size class of the appointment box:
    const blockSizeClass = blockSize === 1 ? "small" : blockSize < 4 ? "medium" : "large";
    // color of the appointment box depending on if it is chosen by the user:
    const appointmentColor = {
        backgroundColor: state.date.chosenAppointment.id === id ? color + "aa" : color + "44",
    };

    // an additional background used to hide the grid behind the appointment so that it can be both transparent and the grid behind it is not seen:
    const backgroundColor = {
        backgroundColor: isFullScreen ? "#fffffff0" : "",
    };

    const grid = {
        start: gridStart,
        end: gridEnd,
        colSpan: gridColSpan
    }

    return {
        data,
        grid,
        blockSizeClass,
        color: appointmentColor,
        backgroundColor,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    const { isFullScreen, id, date } = props;
    return {
        setChosenAppointment: () => {
            if (isFullScreen) {
                dispatch(Actions.chooseAppointment(id, date));
                dispatch(Actions.copyAppointmentDataToForm(id, date));
            }
        },
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Appointment);

export default Container;
