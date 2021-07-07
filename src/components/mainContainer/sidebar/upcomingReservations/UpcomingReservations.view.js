import React from "react";

const UpcomingReservations = ({ upcoming, setChosenAppointment }) => {
    return (
        <div className="terms">
            <h2 className="terms__heading">Najbliższe rezerwacje</h2>
            <div className="terms__content">
                {upcoming.map(([date, list]) => (
                    <div key={date} className="terms__day">
                        <h3 className="terms__date">{date.split(".").slice(0, 2).join(".")}</h3>
                        <ul className="terms__list">
                            {list.map(({ appointmentId, duration, start, title }) => (
                                <li
                                    key={appointmentId}
                                    className="term"
                                    onDoubleClick={() => setChosenAppointment(appointmentId, date)}
                                    onTouchStart={() => setChosenAppointment(appointmentId, date)}
                                    title={`${title}\nKliknij dwa razy aby przejść do widoku tej rezerwacji`}
                                >
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
