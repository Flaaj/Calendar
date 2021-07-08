// redux:
import { connect } from "react-redux";
// api:
import { addNewAppointment } from "../../../../api";
// view:
import NewAppointmentForm from "./NewAppointmentForm.view";
// Actions:
import { Actions } from "../../../../actionCreators";

const onSubmit = (state) => (e) => {
    e.preventDefault();
    const { name, phone, email, date, from, to, note, color } = state.newAppointmentForm;
    const user = state.database.firebase.auth().currentUser.email;

    const timeWindows = [];
    for (let i = +from; i <= +to; i++) {
        timeWindows.push(i);
    }

    if (timeWindows.length === 0) {
        alert("Rezerwacja nie może zaczynać się później, niż się kończy :(");
    } else if (name && date && timeWindows.length > 0) {
        const body = {
            name,
            timeWindows,
            phone: phone || "",
            email: email || "",
            note: note || "",
            color,
            addedBy: user,
            addedDate: Date.now(),
        };
        const target = date.replaceAll("-", "/").replaceAll("/0", "/");
        addNewAppointment(target, body);
    } else {
        alert(
            "Uzupełnij co najmniej imię, date wizyty oraz godzinę jej rozpoczęcia i zakończenia. Reszta danych jest opcjonalna"
        );
    }
};

const handleChange = (dispatch) => (target) => (e) => {
    const { value } = e.target;
    dispatch(Actions.changeNewAppointmentInput(target, value));
};

const mapStateToProps = (state) => {
    const hours = [];
    for (let i = 0; i < 45; i++) {
        const hour = 7 + ~~(i / 4);
        const minute = 15 * (i % 4) || "00";
        hours.push(`${hour}:${minute}`);
    }

    const { name, phone, email, date, from, to, note, color, timeWindows } = state.newAppointmentForm;

    return {
        name,
        phone,
        email,
        date,
        from,
        to,
        note,
        color,
        timeWindows,
        hours,
        onSubmit: onSubmit(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: handleChange(dispatch),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(NewAppointmentForm);

export default Container;
