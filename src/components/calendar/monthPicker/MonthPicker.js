import React from "react";
// redux:
import { connect } from "react-redux";
// assets:
import arrow from "../../../../public/assets/arrow.svg";
// constants:
import { monthNames } from "../../../constants";

const MonthPicker = ({
    month,
    year,
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
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
                <button onClick={decreaseYear} className="arrow arrow--left">
                    <img src={arrow} alt="poprzedni rok" />
                </button>
                {year}
                <button onClick={increaseYear} className="arrow arrow--right">
                    <img src={arrow} alt="następny rok" />
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    if (state) {
        return {
            year: state.date.year,
            month: state.date.month,
        };
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        increaseMonth: () => dispatch({ type: "month/increase" }),
        decreaseMonth: () => dispatch({ type: "month/decrease" }),
        increaseYear: () => dispatch({ type: "year/increase" }),
        decreaseYear: () => dispatch({ type: "year/decrease" }),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(MonthPicker);

export default Container;
