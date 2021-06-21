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
            console.log(dayData)
            Object.entries(dayData).forEach(appointment => {
                console.log(appointment)

            })
        }
    }

    return {};
};

const Container = connect(mapStateToProps)(UpcomingReservations);

export default Container;
