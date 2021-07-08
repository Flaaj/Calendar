import React, { useState, useEffect } from "react";
// components:
import AppointmentDetails from "./appointmentDetails/AppointmentDetails";
import Appointment from "./appointment/Appointment";
// assets:
const bg = "../../../public/assets/day-container-bg.svg";
// functions:
import { dateDisplay } from "../../../../functions";
// styles:
import "./_dayContainer.scss";

const DayContainer = ({
    date,
    data,
    displayDetails,
    setChosenAppointment,
    isTodayClass,
    isCurrentMonthClass,
    appointmentsGridColSpan,
    setChosenDay,
    isFullScreen
}) => (
    <div
        onClick={() => !isFullScreen && setChosenDay(date.toLocaleDateString())}
        className={"day-container" + isTodayClass + isCurrentMonthClass + (isFullScreen ? " fullscreen" : "")}
    >
        <header className="day-container__header">
            <h3>{dateDisplay(date, isFullScreen)}</h3>
        </header>
        <div className="day-container__content">
            <div className="day-container__appointments" style={{ backgroundImage: `url(${bg})` }}>
                {data &&
                    data.map(([id], index) => (
                        <Appointment
                            date={date}
                            key={id}
                            id={id}
                            isFullScreen={isFullScreen}
                            gridColSpan={appointmentsGridColSpan[index]}
                        />
                    ))}
            </div>
            {isFullScreen && (
                <div className="day-container__panel panel">
                    <button
                        className="panel__button"
                        onClick={() => {
                            setChosenDay("");
                            setChosenAppointment("");
                        }}
                    >
                        Powrót do kalendarza
                    </button>
                    {displayDetails && <AppointmentDetails />}
                </div>
            )}
        </div>
    </div>
);

export default DayContainer;
