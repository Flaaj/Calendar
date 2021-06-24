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
    gridColSpan,
}) => {
    return (
        <div
            className={`day-container__appointment grid-start-${gridStart} grid-end-${gridEnd} ${gridColSpan}`}
            style={backgroundColor}
            data-id={id}
        >
            <div className="appointment" style={color} onClick={setChosenAppointment}>
                <div className={`appointment__content ${blockSizeClass}`}>
                    <div className="appointment__name">{name}</div>
                    {phone && (
                        <div className="appointment__phone">
                            tel: {phone}
                        </div>
                    )}
                    {email && (
                        <div className="appointment__email">
                            <a href={`mailto: ${email}`}>{email}</a>
                        </div>
                    )}
                    {note && (
                        <div className="appointment__note">
                            Notatka: <span className="note">{note}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Appointment;
