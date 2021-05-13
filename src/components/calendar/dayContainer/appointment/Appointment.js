import React from 'react';

const Appointment = ({data, id, isFullScreen, chosenAppointment, setChosenAppointment}) => {
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
}

export default Appointment;
