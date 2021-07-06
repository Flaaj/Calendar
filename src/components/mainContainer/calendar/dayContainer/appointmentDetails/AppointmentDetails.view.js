import React, { useState } from "react";
// api:
import { deleteAppointment } from "../../../../../api";

const AppointmentDetails = ({ name, phone, email, from, to, note, hours, color, handleChange, onSubmit }) => {
    const [enableInputs, setEnableInputs] = useState(false);
    const toggleInputs = () => setEnableInputs((prev) => !prev);

    return (
        <div className="appointment-details">
            <div className="appointment-details__header">
                <h2 className="appointment-details__heading">Dane o rezerwacji</h2>
                <button onClick={toggleInputs} className="appointment-details__toggle">
                    {enableInputs ? "Cofnij" : "Edytuj"}
                </button>
            </div>
            <form className={"new-appointment-form__form form" + (enableInputs && " edit")} onSubmit={onSubmit}>
                <h3>
                    <label htmlFor="name" className="form__label">
                        Title:
                    </label>
                </h3>
                <input
                    id="name"
                    type="text"
                    className="form__input"
                    onChange={handleChange("name")}
                    value={name}
                    placeholder="Reservation title"
                    disabled={!enableInputs}
                />
                <h3>Dane kontaktowe:</h3>
                <div className="form__row">
                    <label htmlFor="phone" className="form__label">
                        Phone:
                    </label>
                    <input
                        id="phone"
                        type="text"
                        className="form__input"
                        onChange={handleChange("phone")}
                        value={phone}
                        placeholder="Phone number"
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
                        onChange={handleChange("email")}
                        value={email}
                        placeholder="Email address"
                        disabled={!enableInputs}
                    />
                </div>
                <h3>Czas trwania:</h3>
                <div className="form__row">
                    <label htmlFor="from" className="form__label form__label--time">
                        from:
                    </label>
                    <select
                        name="from"
                        id="from"
                        value={from}
                        onChange={handleChange("from")}
                        className="form__select"
                        disabled={!enableInputs}
                    >
                        {hours.slice(0, -1).map((option, index) => (
                            <option key={option} value={index + 1} className="form__option">
                                {option}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="to" className="form__label form__label--time">
                        to:
                    </label>
                    <select
                        name="to"
                        id="to"
                        value={to}
                        onChange={handleChange("to")}
                        className="form__select"
                        disabled={!enableInputs}
                    >
                        {hours.slice(1).map((option, index) => (
                            <option key={option} value={index + 1} className="form__option">
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <h3>
                    <label htmlFor="from" className="form__label">
                        Note:
                    </label>
                </h3>
                <textarea
                    rows="8"
                    name="note"
                    id="note"
                    value={note}
                    onChange={handleChange("note")}
                    className="form__input"
                    placeholder="Note..."
                    disabled={!enableInputs}
                />
                <div className="form__row">
                    <label htmlFor="email" className="form__label">
                        Color:
                    </label>
                    <input
                        id="color"
                        type="color"
                        onChange={handleChange("color")}
                        value={color}
                        className="form__input form__input--color"
                        disabled={!enableInputs}
                    />
                </div>
                <button type="submit" className="form__submit">
                    Save changes
                </button>
            </form>
            <button onClick={deleteAppointment} className="panel__delete">
                Delete reservation
            </button>
        </div>
    );
};

export default AppointmentDetails;
