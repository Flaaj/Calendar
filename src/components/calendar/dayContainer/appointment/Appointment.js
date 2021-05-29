// redux:
import { connect } from "react-redux";
// view:
import Appointment from "./Appointment.view";
// functions:
import { getTarget } from "../../../../functions";

const mapStateToProps = (state, props) => {
    const { date, id, isFullScreen } = props;
    const { target, day } = getTarget(date);

    const data = state.database.data[target][day][id];
    const { color, timeWindows, name, phone, email, note } = data;

    const blockSize = timeWindows.length;
    const [gridStart, gridEnd] = [timeWindows[0], timeWindows[blockSize - 1]];
    const blockSizeClass = blockSize === 1 ? "small" : blockSize < 4 ? "medium" : "large";

    return {
        name,
        email,
        phone,
        note,
        gridStart,
        gridEnd,
        blockSizeClass,
        color: {
            backgroundColor: state.date.chosenAppointment.id === id ? color + "99" : color + "44",
        },
        backgroundColor: {
            backgroundColor: isFullScreen ? "#fffffff0" : "",
        },
    };
};
const mapDispatchToProps = (dispatch, props) => {
    const { isFullScreen, id, date } = props;
    return {
        setChosenAppointment: () => {
            if (isFullScreen) {
                dispatch({
                    type: "appointment/choose",
                    payload: { id, date },
                });
                dispatch({
                    type: "appointment-data/copy",
                    payload: { id, date },
                });
            }
        },
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Appointment);

export default Container;
