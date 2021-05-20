import React, { useState, useEffect } from "react";
// functions:
import { refreshState } from "../../../../functions";
// api:
import { addNewAppointment } from "../../../../api";

const NewAppointmentForm = ({ firebase }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [from, setFrom] = useState("1");
    const [to, setTo] = useState("1");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [color, setColor] = useState("#000000");
    const [timeWindows, setTimeWindows] = useState([]);

    useEffect(() => {
        const timeWindowNumbers = [];
        for (let i = +from; i <= +to; i++) {
            timeWindowNumbers.push(i);
        }
        setTimeWindows(timeWindowNumbers);
    }, [from, to]);

    const [hours, setHours] = useState([]);
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

    return (
        <div className="new-appointment-form">
            <h2 className="new-appointment-form__heading">Nowa rezerwacja</h2>
            <form className="new-appointment-form__form form" onSubmit={onSubmit}>
                <div className="form__row">
                    <label htmlFor="name" className="form__label">
                        Imię:
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="form__input"
                        onChange={refreshState(setName)}
                        value={name}
                        placeholder="Imię i/lub nazwisko klienta"
                    />
                </div>
                <div className="form__row">
                    <label htmlFor="phone" className="form__label">
                        Tel:
                    </label>
                    <input
                        id="phone"
                        type="telephone"
                        className="form__input"
                        onChange={refreshState(setPhone)}
                        value={phone}
                        placeholder="Numer telefonu"
                    />
                </div>
                <div className="form__row">
                    <label htmlFor="email" className="form__label">
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form__input"
                        onChange={refreshState(setEmail)}
                        value={email}
                        placeholder="Adres email"
                    />
                </div>
                <div className="form__row">
                    <label htmlFor="date" className="form__label">
                        Data:
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={refreshState(setDate)}
                        className="form__input"
                    />
                </div>
                <div className="form__row">
                    <label htmlFor="from" className="form__label">
                        Poczatek:
                    </label>
                    <select
                        name="from"
                        id="from"
                        value={from}
                        onChange={refreshState(setFrom)}
                        className="form__select"
                    >
                        {hours.slice(0, -1).map((option, index) => (
                            <option key={option} value={index + 1} className="form__option">
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form__row">
                    <label htmlFor="from" className="form__label">
                        Koniec:
                    </label>
                    <select name="to" id="to" value={to} onChange={refreshState(setTo)} className="form__select">
                        {hours.slice(1).map((option, index) => (
                            <option key={option} value={index + 1} className="form__option">
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form__row">
                    <label htmlFor="from" className="form__label">
                        Notatka:
                    </label>
                    <textarea
                        rows="8"
                        name="note"
                        id="note"
                        value={note}
                        onChange={refreshState(setNote)}
                        className="form__input"
                        placeholder="Notatka..."
                    />
                </div>
                <div className="form__row">
                    <label htmlFor="email" className="form__label">
                        Kolor kafelka w kalendarzu:
                    </label>
                    <input
                        id="color"
                        type="color"
                        value={color}
                        onChange={refreshState(setColor)}
                        className="form__input form__input--color"
                    />
                </div>
                <button type="submit" className="form__submit">
                    Dodaj rezerwację
                </button>
            </form>
        </div>
    );
};

export default NewAppointmentForm;
