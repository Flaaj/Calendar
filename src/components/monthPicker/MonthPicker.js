import React from "react";
// styles:
import "./monthPicker.scss";
// assets:
import arrow from "../../../public/assets/arrow.svg";

const MonthPicker = ({
    month,
    year,
    decreaseMonth,
    increaseMonth,
    changeYear,
}) => {
    return (
        <div className="month-picker">
            <div className="month-picker__month">
                <button onClick={decreaseMonth} className="arrow arrow--left">
                    <img src={arrow} alt="poprzedni miesiąc" />
                </button>
                {monthNames[month]}
                <button onClick={increaseMonth} className="arrow arrow--right">
                    <img src={arrow} alt="nastepny miesiąc" />
                </button>
            </div>
            <div className="month-picker__year">
                <button
                    onClick={() => changeYear("down")}
                    className="arrow arrow--left"
                >
                    <img src={arrow} alt="poprzedni rok" />
                </button>
                {year}
                <button
                    onClick={() => changeYear("up")}
                    className="arrow arrow--right"
                >
                    <img src={arrow} alt="następny rok" />
                </button>
            </div>
        </div>
    );
};

export default MonthPicker;

const monthNames = {
    1: "Styczeń",
    2: "Luty",
    3: "Marzec",
    4: "Kwiecień",
    5: "Maj",
    6: "Czerwiec",
    7: "Lipiec",
    8: "Sierpień",
    9: "Wrzesień",
    10: "Październik",
    11: "Listopad",
    12: "Grudzień",
};