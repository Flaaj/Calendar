// redux:
import { connect } from "react-redux";
// view:
import UpcomingReservations from "./UpcomingReservations.view";
// functions:
import { nextDays, convertIndexToHour } from "../../../../functions";
import { Actions } from "../../../../actionCreators";

const mapStateToProps = (state) => {
    const upcoming = {};
    for (const date of nextDays(new Date(), state.options.upcomingDays)) {
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
                const start = convertIndexToHour(7, appointment[1].timeWindows[0], "start");
                const duration = convertIndexToHour(0, appointment[1].timeWindows.length, "duration");
                const title = appointment[1].name;
                upcoming[date].push({ appointmentId, start, duration, title });
            });
        }
    }

    return { upcoming: Object.entries(upcoming) };
};

const mapDispatchToProps = (dispatch) => {
    const setChosenAppointment = (id, date) => {
        const [d, m, y] = date.split(".");
        const dateReference = new Date(y, m - 1, d)
        dispatch(Actions.chooseDay(date));
        dispatch(Actions.chooseAppointment(id, date));
        dispatch(Actions.copyAppointmentDataToForm(id, dateReference));
    };
    return {
        setChosenAppointment,
    };
};
const Container = connect(mapStateToProps, mapDispatchToProps)(UpcomingReservations);

export default Container;
