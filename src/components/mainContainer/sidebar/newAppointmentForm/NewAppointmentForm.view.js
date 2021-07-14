import React from "react";
// styles:
import "./_newAppointmentForm.scss";
// elements:
import Heading from "../../../../elements/Heading/Heading";
import Input from "../../../../elements/Input/Input";

const NewAppointmentForm = ({
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
    onSubmit,
}) => {
    return (
        <div className="new-appointment-form">
            <Heading level="h2" text="Nowa rezerwacja" classNames="new-appointment-form__heading" />
            <form className="new-appointment-form__form form" onSubmit={onSubmit}>
                <Input
                    name="name"
                    value={name}
                    changeHandler={handleChange("name")}
                    label="Imię:"
                    placeholder="Imię i/lub nazwisko klienta"
                />
                <Input
                    name="phone"
                    type="tel"
                    value={phone}
                    changeHandler={handleChange("phone")}
                    label="Tel:"
                    placeholder="Numer telefonu"
                />
                <Input
                    name="email"
                    type="email"
                    value={email}
                    changeHandler={handleChange("email")}
                    label="Email:"
                    placeholder="Adres email"
                />
                <Input
                    name="Data"
                    type="date"
                    value={date}
                    changeHandler={handleChange("date")}
                    label="Data:"
                />
                <Input
                    name="Data"
                    type="select"
                    value={date}
                    changeHandler={handleChange("date")}
                    label="Początek:"
                    options={hours.slice(0, -1).map((option, index) => (
                        <option key={option} value={index + 1} className="form__option">
                            {option}
                        </option>
                    ))}
                />
                <Input
                    name="Data"
                    type="select"
                    value={date}
                    changeHandler={handleChange("date")}
                    label="Koniec:"
                    options={hours.slice(1).map((option, index) => (
                        <option key={option} value={index + 1} className="form__option">
                            {option}
                        </option>
                    ))}
                />
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
