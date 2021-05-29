// redux:
import { connect } from "react-redux";
// view:
import DayContainer from "./DayContainer.view";
// functions:
import { getTarget } from "../../../functions";

const getAppointmentsGridColSpan = (data) => {
    const dict = {};

    data.forEach(([_, appointment]) => {
        const { timeWindows } = appointment;
        for (const timeWindow of timeWindows) {
            dict[timeWindow] = dict[timeWindow] ? dict[timeWindow] + 1 : 1;
        }
    });

    const result = [];
    data.forEach(([_, appointment]) => {
        const { timeWindows } = appointment;
        result.push(
            timeWindows.reduce((p, c) => {
                return dict[c] > p ? dict[c] : p;
            }, 1)
        );
    });
    return result.map((r) => `span-${Math.max(12 / r, 2)}`);
};

const mapStateToProps = (state, props) => {
    const { date, isCurrentMonth } = props;

    const { target, day, dateString } = getTarget(date);

    const isToday = state.date.today === dateString;
    const data =
        state.database.data[target] && state.database.data[target][day] ? state.database.data[target][day] : {};

    const { id } = state.date.chosenAppointment;
    const sortedData = Object.entries(data);
    sortedData.sort((a, b) => {
        const A = a[1].timeWindows;
        const B = b[1].timeWindows;
        if (A[0] > B[0]) {
            return 1;
        } else if (A[0] === B[0]) {
            const aL = A.length - 1;
            const bL = B.length - 1;
            if (aL > bL) return 1;
            else return -1;
        } else {
            return -1;
        }
    });

    const appointmentsGridColSpan = data ? getAppointmentsGridColSpan(sortedData) : [];

    return {
        data: sortedData,
        isTodayClass: isToday ? " today" : "",
        isCurrentMonthClass: isCurrentMonth ? " current-month" : "",
        displayDetails: data && data[id],
        appointmentsGridColSpan,
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
