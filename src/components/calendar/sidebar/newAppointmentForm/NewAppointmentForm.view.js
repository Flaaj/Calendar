import React, { useState, useEffect } from "react";
// functions:
import { refreshState } from "../../../../functions";
// api:
import { addNewAppointment } from "../../../../api";

const NewAppointmentForm = ({
    firebase,
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
    onSubmit
}) => {

    return (
        <div className="new-appointment-form">
            <h2 className="new-appointment-form__heading">Nowa rezerwacja</h2>
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
                        onChange={handleChange("name")}
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
                        onChange={handleChange("phone")}
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
                        onChange={handleChange("email")}
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
                        onChange={handleChange("date")}
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
                        onChange={handleChange("from")}
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
                        onChange={handleChange("to")}
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
                        onChange={handleChange("note")}
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
                        onChange={handleChange("color")}
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
