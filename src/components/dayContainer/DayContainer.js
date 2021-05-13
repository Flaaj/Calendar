import React, { useState, useEffect } from "react";
// components:
import AppointmentDetails from "./appointmentDetails/ApointmentDetails";
// assets:
const bg = "../../../public/assets/day-container-bg.svg";
// functions:
import { isToday, dateDisplay } from "../../functions";
// api:
import { deleteAppointment } from "../../api";

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
            className={
                "day-container" +
                isTodayClass +
                isCurrentMonthClass +
                isFullScreenClass
            }
        >
            <header className="day-container__header">
                <h3>{dateDisplay(date, isFullScreen)}</h3>
            </header>
            <div className="day-container__content">
                <div
                    className="day-container__appointments"
                    style={{ backgroundImage: `url(${bg})` }}
                >
                    {data &&
                        Array.from(Object.keys(data)).map((id) => {
                            const {
                                color,
                                timeWindows,
                                name,
                                phone,
                                email,
                                note,
                            } = data[id];
                            const blockSize = timeWindows.length;
                            const start = timeWindows[0];
                            const end = timeWindows[blockSize - 1];
                            const blockSizeClass =
                                blockSize === 1
                                    ? "small"
                                    : blockSize < 4
                                    ? "medium"
                                    : "large";
                            return (
                                <div
                                    className={`day-container__appointment grid-start-${start} grid-end-${end}`}
                                    style={{
                                        backgroundColor: isFullScreen
                                            ? "white"
                                            : "",
                                    }}
                                    key={id}
                                    data-id={id}
                                >
                                    <div
                                        className="appointment"
                                        style={{
                                            backgroundColor:
                                                id === chosenAppointment
                                                    ? color + "99"
                                                    : color + "44",
                                        }}
                                        onClick={() =>
                                            isFullScreen &&
                                            setChosenAppointment(id)
                                        }
                                    >
                                        <div
                                            className={`appointment__content ${blockSizeClass}`}
                                        >
                                            <div className="appointment__name">
                                                {name}
                                            </div>
                                            <div className="appointment__row">
                                                <div className="appointment__phone">
                                                    {phone}
                                                </div>
                                                <div className="appointment__email">
                                                    {email}
                                                </div>
                                            </div>
                                            <div className="appointment__note">
                                                {note}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
                                    onClick={() =>
                                        deleteAppointment(firebase, date, chosenAppointment)
                                    }
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
