import React, { useState, useEffect } from "react";
// functions:
import { refreshState } from "../../../../functions";
// api:
import { addNewAppointment } from "../../../../api";


useEffect(() => {
    const divisions = [];
    for (let i = 0; i < 45; i++) {
        const hour = 7 + ~~(i / 4);
        const minute = 15 * (i % 4) || "00";
        divisions.push(`${hour}:${minute}`);
        setHours(divisions);
    }
}, []);

const onSubmit = (e) => {
    e.preventDefault();
    const body = {};
    if (timeWindows.length === 0) {
        alert("Rezerwacja nie może zaczynać się później, niż się kończy :(");
    } else if (name && date && timeWindows.length > 0) {
        body.name = name;
        body.timeWindows = timeWindows;
        phone && (body.phone = phone);
        email && (body.email = email);
        note && (body.note = note);
        color && (body.color = color);

        const target = date.replaceAll("-", "/").replaceAll("/0", "/");

        addNewAppointment(firebase, target, body);
    } else {
        alert(
            "Uzupełnij co najmniej imię, date wizyty oraz godzinę jej rozpoczęcia i zakończenia. Reszta danych jest opcjonalna"
        );
    }
};

const mapStateToProps = (state) => {
    return {
    };
};

const dispatch = (dispatch) => {
    return {
    };
};

const Container = connect(mapStateToProps)(NewAppointmentForm);

export default Container;
