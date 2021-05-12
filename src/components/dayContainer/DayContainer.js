import React, { useState, useEffect } from "react";
// styles:
import "./dayContainer.scss";
// assets:
// import bg from "../../../public/assets/day-container-bg.svg";
const bg = "../../../public/assets/day-container-bg.svg";

const DayContainer = ({ date, isCurrentMonth, data, firebase }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isFullScreenClass, setIsFullScreenClass] = useState("");
    const [chosenAppointment, setChosenAppointment] = useState("");

    const isTodayClass = date.toLocaleDateString() === new Date().toLocaleDateString() ? " today" : "";
    const isCurrentMonthClass = isCurrentMonth ? " current-month" : "";

    useEffect(() => {
        setIsFullScreenClass(isFullScreen ? " fullscreen" : "");
    }, [isFullScreen]);

    const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

    const dateDisplay = () => {
        let dateString = "";
        if (isFullScreen) {
            dateString += date
                .toLocaleDateString()
                .split(".")
                .map((el, i) => (i === 1 ? monthNames[+el] : el))
                .join(" ");
        } else {
            dateString += date.toLocaleDateString().split(".")[0];
        }
        return dateString;
    };

    const deleteAppointment = (id) => {
        const [day, month, year] = date.toLocaleDateString().split(".");
        const target = `${year}/${+month}/${+day}/${id}`;
        console.log(target);
        firebase
            .database()
            .ref(target)
            .remove()
            .then(() => {})
            .catch((err) => console.log(err));
    };

    return (
        <div
            onClick={() => !isFullScreen && toggleFullScreen()}
            className={"day-container" + isTodayClass + isCurrentMonthClass + isFullScreenClass}
        >
            <header className="day-container__header">
                <h3>{dateDisplay()}</h3>
            </header>
            <div className="day-container__content">
                <div className="day-container__appointments" style={{ backgroundImage: `url(${bg})` }}>
                    {data &&
                        Array.from(Object.keys(data)).map((id) => {
                            const { color, timeWindows, name, phone, email, note } = data[id];
                            const blockSize = timeWindows.length;
                            const start = timeWindows[0];
                            const end = timeWindows[blockSize - 1];
                            const blockSizeClass = blockSize === 1 ? "small" : blockSize < 4 ? "medium" : "large";
                            return (
                                <div
                                    className={`day-container__appointment grid-start-${start} grid-end-${end}`}
                                    style={{
                                        backgroundColor: isFullScreen ? "white" : "",
                                    }}
                                    key={id}
                                    data-id={id}
                                >
                                    <div
                                        className="appointment"
                                        style={{
                                            backgroundColor: id === chosenAppointment ? color + "99" : color + "44",
                                        }}
                                        onClick={() => isFullScreen && setChosenAppointment(id)}
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
                        })}
                </div>
                {isFullScreen && (
                    <div className="day-container__panel">
                        <button
                            onClick={() => {
                                setChosenAppointment("")
                                setIsFullScreen(false);
                            }}
                        >
                            Powrót do kalendarza
                        </button>
                        <button onClick={() => deleteAppointment(chosenAppointment)}>Usuń rezerwację</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DayContainer;

const monthNames = {
    1: "Stycznia",
    2: "Lutego",
    3: "Marca",
    4: "Kwietnia",
    5: "Maja",
    6: "Czerwca",
    7: "Lipca",
    8: "Sierpnia",
    9: "Września",
    10: "Października",
    11: "Listopada",
    12: "Grudnia",
};
