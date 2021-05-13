import React, { useEffect, useState } from "react";
// functions:
import { refreshState } from "../../../../functions";
// api:
import { updateAppointment } from "../../../../api";

const AppointmentDetails = ({ appointmentId, data, firebase, date }) => {
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [note, setNote] = useState();
    const [color, setColor] = useState();
    const [timeWindows, setTimeWindows] = useState();
    const [enableInputs, setEnableInputs] = useState(false);

    useEffect(() => {
        setName(data.name);
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setFrom(data.timeWindows[0]);
        setTo(data.timeWindows[data.timeWindows.length - 1]);
        setNote(data.note || "");
        setColor(data.color);
        setTimeWindows(data.timeWindows);
    }, [data]);

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

    useEffect(() => {
        const timeWindowNumbers = [];
        for (let i = +from; i <= +to; i++) {
            timeWindowNumbers.push(i);
        }
        setTimeWindows(timeWindowNumbers);
    }, [from, to]);

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            name,
            email,
            phone,
            timeWindows,
            note,
            color,
        };

        updateAppointment(firebase, date, appointmentId, body);
    };

    const toggleInputs = () => setEnableInputs((prev) => !prev);

    return (
        <div className="appointment-details">
            <div className="appointment-details__header">
                <h2 className="appointment-details__heading">
                    Dane o rezerwacji
                </h2>
                <button
                    onClick={toggleInputs}
                    className="appointment-details__toggle"
                >
                    {enableInputs ? "Cofnij" : "Edytuj"}
                </button>
            </div>
            <form
                className={
                    "new-appointment-form__form form" +
                    (enableInputs && " edit")
                }
                onSubmit={onSubmit}
            >
                <h3>
                    <label htmlFor="name" className="form__label">
                        Imię:
                    </label>
                </h3>
                <input
                    id="name"
                    type="text"
                    className="form__input"
                    onChange={refreshState(setName)}
                    value={name}
                    placeholder="Imię i/lub nazwisko klienta"
                    disabled={!enableInputs}
                />
                <h3>Dane kontaktowe:</h3>
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
                        disabled={!enableInputs}
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
                        disabled={!enableInputs}
                    />
                </div>
                <h3>Czas trwania:</h3>
                <div className="form__row">
                    <label
                        htmlFor="from"
                        className="form__label form__label--time"
                    >
                        od:
                    </label>
                    <select
                        name="from"
                        id="from"
                        value={from}
                        onChange={refreshState(setFrom)}
                        className="form__select"
                        disabled={!enableInputs}
                    >
                        {hours.slice(0, -1).map((option, index) => (
                            <option
                                key={option}
                                value={index + 1}
                                className="form__option"
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="to"
                        className="form__label form__label--time"
                    >
                        do:
                    </label>
                    <select
                        name="to"
                        id="to"
                        value={to}
                        onChange={refreshState(setTo)}
                        className="form__select"
                        disabled={!enableInputs}
                    >
                        {hours.slice(1).map((option, index) => (
                            <option
                                key={option}
                                value={index + 1}
                                className="form__option"
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <h3>
                    <label htmlFor="from" className="form__label">
                        Notatka:
                    </label>
                </h3>
                <textarea
                    rows="8"
                    name="note"
                    id="note"
                    value={note}
                    onChange={refreshState(setNote)}
                    className="form__input"
                    placeholder="Notatka..."
                    disabled={!enableInputs}
                />
                <div className="form__row">
                    <label htmlFor="email" className="form__label">
                        Kolor kafelka:
                    </label>
                    <input
                        id="color"
                        type="color"
                        value={color}
                        onChange={refreshState(setColor)}
                        className="form__input form__input--color"
                        disabled={!enableInputs}
                    />
                </div>
                <button type="submit" className="form__submit">
                    Zapisz zmiany
                </button>
            </form>
        </div>
    );
};

export default AppointmentDetails;
