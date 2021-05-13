import React, { useState, useEffect } from "react";
// components:
import AppointmentDetails from "./appointmentDetails/AppointmentDetails";
import Appointment from "./appointment/Appointment";
// assets:
const bg = "../../../public/assets/day-container-bg.svg";
// functions:
import { isToday, dateDisplay } from "../../../functions";
// api:
import { deleteAppointment } from "../../../api";

const DayContainer = ({ date, isCurrentMonth, data, firebase }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isFullScreenClass, setIsFullScreenClass] = useState("");
    const [chosenAppointment, setChosenAppointment] = useState("");

    const isTodayClass = isToday(date) ? " today" : "";
    const isCurrentMonthClass = isCurrentMonth ? " current-month" : "";

    useEffect(() => {
        setIsFullScreenClass(isFullScreen ? " fullscreen" : "");
    }, [isFullScreen]);

    const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

    return (
        <div
            onClick={() => !isFullScreen && toggleFullScreen()}
            className={"day-container" + isTodayClass + isCurrentMonthClass + isFullScreenClass}
        >
            <header className="day-container__header">
                <h3>{dateDisplay(date, isFullScreen)}</h3>
            </header>
            <div className="day-container__content">
                <div className="day-container__appointments" style={{ backgroundImage: `url(${bg})` }}>
                    {data &&
                        Array.from(Object.keys(data)).map((id) => (
                            <Appointment
                                data={data}
                                key={id}
                                id={id}
                                isFullScreen={isFullScreen}
                                chosenAppointment={chosenAppointment}
                                setChosenAppointment={setChosenAppointment}
                            />
                        ))}
                </div>
                {isFullScreen && (
                    <div className="day-container__panel panel">
                        <button
                            className="panel__button"
                            onClick={() => {
                                setChosenAppointment("");
                                setIsFullScreen(false);
                            }}
                        >
                            Powrót do kalendarza
                        </button>
                        {data && data[chosenAppointment] && (
                            <>
                                <AppointmentDetails
                                    appointmentId={chosenAppointment}
                                    data={data[chosenAppointment]}
                                    firebase={firebase}
                                    date={date}
                                    setChosenAppointment={setChosenAppointment}
                                />
                                <button
                                    onClick={() => deleteAppointment(firebase, date, chosenAppointment)}
                                    className="panel__delete"
                                >
                                    Usuń rezerwację
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DayContainer;
