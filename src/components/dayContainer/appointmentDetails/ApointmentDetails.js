import React, { useEffect, useState } from "react";

const ApointmentDetails = ({
    appointmentId,
    data,
    firebase,
    date,
}) => {
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [note, setNote] = useState();
    // const [date, setDate] = useState();
    const [color, setColor] = useState();
    const [timeWindows, setTimeWindows] = useState();

    useEffect(() => {
        setName(data.name);
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setFrom(data.timeWindows[0]);
        setTo(data.timeWindows[data.timeWindows.length - 1]);
        setNote(data.note || "");
        // setDate(date);
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

    const refreshState =
        (setState) =>
        ({ target: { value } }) => {
            setState(value);
        };

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
        console.log(body)
        const [day, month, year] = date.toLocaleDateString().split(".");
        const target = `${year}/${+month}/${+day}/${appointmentId}`;
        firebase
            .database()
            .ref(target)
            .update(body)
            .then((data) => {console.log(data)}).catch(err => console.log(err));
    };

    return (
        <div>
            <form
                className="new-appointment-form__form form"
                onSubmit={onSubmit}
            >
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
                {/* <div className="form__row">
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
                </div> */}
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
                <div className="form__row">
                    <label htmlFor="from" className="form__label">
                        Koniec:
                    </label>
                    <select
                        name="to"
                        id="to"
                        value={to}
                        onChange={refreshState(setTo)}
                        className="form__select"
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
                    Zapisz zmiany
                </button>
            </form>
        </div>
    );
};

export default ApointmentDetails;
