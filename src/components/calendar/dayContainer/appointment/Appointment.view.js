import React from "react";

const Appointment = ({
    id,
    name,
    email,
    phone,
    note,
    blockSizeClass,
    backgroundColor,
    color,
    gridStart,
    gridEnd,
    setChosenAppointment,
}) => {
    return (
        <div
            className={`day-container__appointment grid-start-${gridStart} grid-end-${gridEnd}`}
            style={backgroundColor}
            data-id={id}
        >
            <div
                className="appointment"
                style={color}
                onClick={setChosenAppointment}
            >
                <div className={`appointment__content ${blockSizeClass}`}>
                    <div className="appointment__name">{name}</div>
                    <div className="appointment__row">
                        <div className="appointment__phone">{phone}</div>
                        <div className="appointment__email">{email}</div>
                    </div>
                    <div className="appointment__note">{note}</div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
