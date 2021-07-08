import React from "react";
// styles:
import "./_appointment.scss";

const Appointment = ({ data, blockSizeClass, backgroundColor, color, grid, setChosenAppointment }) => {
    return (
        <div
            className={`day-container__appointment grid-start-${grid.start} grid-end-${grid.end} ${grid.colSpan}`}
            style={backgroundColor}
        >
            <div className="appointment" style={color} onClick={setChosenAppointment}>
                <div className={`appointment__content ${blockSizeClass}`}>
                    <div className="appointment__name">{data.name}</div>
                    {data.phone && <div className="appointment__phone">tel: {data.phone}</div>}
                    {data.email && (
                        <div className="appointment__email">
                            <a href={`mailto: ${data.email}`}>{data.email}</a>
                        </div>
                    )}
                    {data.note && (
                        <div className="appointment__note">
                            Notatka: <span className="note">{data.note}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Appointment;
