import React from "react";
// assets:
import arrow from "../../../../../public/assets/arrow.svg";
// constants:
import { monthNames } from "../../../../constants";

const MonthPicker = ({ month, year, decreaseMonth, increaseMonth, decreaseYear, increaseYear }) => {
    return (
        <div className="month-picker">
            <div className="month-picker__month">
                <button onClick={decreaseMonth} className="arrow arrow--left">
                    <img src={arrow} alt="previous month" />
                </button>
                {monthNames[month]}
                <button onClick={increaseMonth} className="arrow arrow--right">
                    <img src={arrow} alt="next month" />
                </button>
            </div>
            <div className="month-picker__year">
                <button onClick={decreaseYear} className="arrow arrow--left">
                    <img src={arrow} alt="previous year" />
                </button>
                {year}
                <button onClick={increaseYear} className="arrow arrow--right">
                    <img src={arrow} alt="next year" />
                </button>
            </div>
        </div>
    );
};

export default MonthPicker;
