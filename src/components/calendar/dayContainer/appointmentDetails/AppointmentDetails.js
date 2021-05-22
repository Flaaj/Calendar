// redux:
import { connect } from "react-redux";
// view:
import AppointmentDetails from "./AppointmentDetails.view";
// api:
import { updateAppointment } from "../../../../api";

const handleChange = (dispatch) => (target) => (e) => {
    const value = e.target.value;
    dispatch({
        type: "appointment-data/change",
        payload: {
            target,
            value,
        },
    });
};

const onSubmit = (chosenAppointment, chosenAppointmentData) => (e) => {
    e.preventDefault();
    const { name, email, phone, from, to, note, color } = chosenAppointmentData;

    const timeWindows = [];
    for (let i = +from; i <= +to; i++) {
        timeWindows.push(i);
    }

    if (timeWindows.length > 0) {
        const body = {
            name,
            email,
            phone,
            timeWindows,
            note,
            color,
        };
        updateAppointment(chosenAppointment, body);
    } else {
        alert("Rezerwacja nie może zaczynać się później, niż się kończy :(");
    }
};

const mapStateToProps = (state) => {
    const { chosenAppointment } = state.date;
    const { chosenAppointment: chosenAppointmentData } = state.database;

    const hours = [];
    for (let i = 0; i < 45; i++) {
        const hour = 7 + ~~(i / 4);
        const minute = 15 * (i % 4) || "00";
        hours.push(`${hour}:${minute}`);
    }

    const { name, phone, email, date, from, to, note, color } = chosenAppointmentData;

    return {
        name,
        phone,
        email,
        date,
        from,
        to,
        note,
        color,
        hours,
        handleChange,
        onSubmit: onSubmit(chosenAppointment, chosenAppointmentData),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: handleChange(dispatch),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(AppointmentDetails);

export default Container;
