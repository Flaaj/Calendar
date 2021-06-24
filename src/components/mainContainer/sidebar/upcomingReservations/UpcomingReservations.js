// redux:
import { connect } from "react-redux";
// view:
import UpcomingReservations from "./UpcomingReservations.view";
// functions:
import { nextDays, convertIndexToHour } from "../../../../functions";

const mapStateToProps = (state) => {
    const upcoming = {};
    for (const date of nextDays(new Date(), 7)) {
        const [day, month, year] = date.split(".");
        const ref = `${year}/${+month}`;
        const dayData = state.database.data[ref]
            ? state.database.data[ref][day]
                ? state.database.data[ref][day]
                : undefined
            : undefined;
        if (dayData) {
            upcoming[date] = [];
            const dayDataArray = Object.entries(dayData);
            dayDataArray.sort((a, b) => (a[1].timeWindows[0] > b[1].timeWindows[0] ? 1 : -1));
            dayDataArray.forEach((appointment) => {
                const appointmentId = appointment[0];
                const start = convertIndexToHour(7, appointment[1].timeWindows[0], "start")
                const duration = convertIndexToHour(0, appointment[1].timeWindows.length, "duration")
                upcoming[date].push({ appointmentId, start, duration })
            });
        }
    }
    console.log(Object.entries(upcoming))

    return { upcoming: Object.entries(upcoming) };
};

const mapDispatchToProps = (dispatch) => {
    const chooseAppointment = (id, day) => {
        const [d, m, y] = day.split(".")
        dispatch({
            type: "day/choose",
            payload: day
        })
        dispatch({
            type: "appointment/choose",
            payload: { id, date: day },
        });
        dispatch({
            type: "appointment-data/copy",
            payload: { id, date: new Date(y, m - 1, d) },
        });

    }
    return {
        chooseAppointment
    }
}
const Container = connect(mapStateToProps, mapDispatchToProps)(UpcomingReservations);

export default Container;
