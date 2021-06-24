import React from "react";

const UpcomingReservations = ({ upcoming, chooseAppointment }) => {
    return (
        <div className="terms">
            <h2 className="terms__heading">Najbliższe rezerwacje</h2>
            <div className="terms__content">
                {upcoming.map(([date, list]) => (
                    <div key={date} className="terms__day">
                        <h3 className="terms__date">{date.split(".").slice(0, 2).join(".")}</h3>
                        <ul className="terms__list">
                            {list.map(({ appointmentId, duration, start }) => (
                                <li key={appointmentId} className="term" onDoubleClick={() => chooseAppointment(appointmentId, date)}>
                                    <div className="term__timespan">{start}</div>
                                    <div className="term__duration">{duration}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingReservations;
