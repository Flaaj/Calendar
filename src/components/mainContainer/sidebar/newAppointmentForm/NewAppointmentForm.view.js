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
                    type="tel"
                    name="phone"
                    value={phone}
                    changeHandler={handleChange("phone")}
                    label="Tel:"
                    placeholder="Numer telefonu"
                />
                <Input
                    type="email"
                    name="email"
                    value={email}
                    changeHandler={handleChange("email")}
                    label="Email:"
                    placeholder="Adres email"
                />
                <Input
                    type="date"
                    name="Data"
                    value={date}
                    changeHandler={handleChange("date")}
                    label="Data:"
                />
                <Input
                    type="select"
                    name="from"
                    value={from}
                    changeHandler={handleChange("from")}
                    label="Początek:"
                    options={hours.slice(0, -1).map((option, index) => (
                        <option key={option} value={index + 1} className="form__option">
                            {option}
                        </option>
                    ))}
                />
                <Input
                    type="select"
                    name="to"
                    value={to}
                    changeHandler={handleChange("to")}
                    label="Koniec:"
                    options={hours.slice(1).map((option, index) => (
                        <option key={option} value={index + 1} className="form__option">
                            {option}
                        </option>
                    ))}
                />
                <Input
                    type="textarea"
                    name="note"
                    value={note}
                    changeHandler={handleChange("note")}
                    label="Notatka:"
                    rows="8"
                />
                <Input
                    type="color"
                    name="color"
                    value={color}
                    changeHandler={handleChange("color")}
                    label="Kolor kafelka w kalendarzu:"
                />
                <button type="submit" className="form__submit">
                    Dodaj rezerwację
                </button>
            </form>
        </div>
    );
};

export default NewAppointmentForm;
