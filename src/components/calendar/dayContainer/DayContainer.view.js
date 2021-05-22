import React, { useState } from "react";
// components:
import AppointmentDetails from "./appointmentDetails/AppointmentDetails";
import Appointment from "./appointment/Appointment";
// assets:
const bg = "../../../public/assets/day-container-bg.svg";
// functions:
import { dateDisplay } from "../../../functions";
// api:
import { deleteAppointment } from "../../../api";

const DayContainer = ({
    date,
    data,
    firebase,
    chosenAppointment,
    setChosenAppointment,
    isTodayClass,
    isCurrentMonthClass,
}) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

    return (
        <div
            onClick={() => !isFullScreen && toggleFullScreen()}
            className={"day-container" + isTodayClass + isCurrentMonthClass + (isFullScreen ? " fullscreen" : "")}
        >
            <header className="day-container__header">
                <h3>{dateDisplay(date, isFullScreen)}</h3>
            </header>
            <div className="day-container__content">
                <div className="day-container__appointments" style={{ backgroundImage: `url(${bg})` }}>
                    {data &&
                        Array.from(Object.keys(data)).map((id) => (
                            <Appointment date={date} key={id} id={id} isFullScreen={isFullScreen} />
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
                        {chosenAppointment.id && (
                            <>
                                <AppointmentDetails />
                                <button
                                    onClick={() => deleteAppointment(firebase, chosenAppointment)}
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
