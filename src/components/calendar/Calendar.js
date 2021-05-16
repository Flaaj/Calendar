import React, { useState, useEffect } from "react";
// redux:
import { connect } from "react-redux";
// actions:
import { queryMonthsToListen } from "../../actions/databaseActions";
// components:
import DayContainer from "./dayContainer/DayContainer";
import MonthPicker from "./monthPicker/MonthPicker";
import CalendarHeader from "./calendarHeader/CalendarHeader";
import Sidebar from "./sidebar/Sidebar";
import FocusWeekToggles from "./focusWeekToggles/FocusWeekToggles";
//constants:
import { daysInMonthDict } from "../../constants";

const Calendar = ({ firebase, setUser, month, year, focusWeek, daysToShow, queryMonthsToListen }) => {
    useEffect(() => queryMonthsToListen(month, year), [month, year]);
    return (
        <div className="app-wrapper">
            <div className="calendar">
                <MonthPicker />
                <div className="calendar__row">
                    <FocusWeekToggles togglesNum={~~(daysToShow.length / 7)} />
                    <div className="calendar__container">
                        <CalendarHeader />
                        <div className={"calendar__month"}>
                            {daysToShow.map(
                                ({ date, isCurrentMonth }, index) =>
                                    (focusWeek === -1 || focusWeek === ~~(index / 7)) && (
                                        <DayContainer
                                            key={date.toLocaleDateString()}
                                            date={date}
                                            isCurrentMonth={isCurrentMonth}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar firebase={firebase} setUser={setUser} />
        </div>
    );
};

const mapStateToProps = (state) => {
    const { year, month, focusWeek } = state.date;
    const daysInMonth = year % 4 === 0 ? { ...daysInMonthDict, 2: 29 } : daysInMonthDict;
    const daysFromOtherMonth = {
        previous: (new Date(year, month - 1, 1).getDay() + 6) % 7,
        next: 6 - ((new Date(year, month, 0).getDay() + 6) % 7),
    };

    const daysToShow = [];
    for (let day = 1 - daysFromOtherMonth.previous; day <= 0; day++) {
        const date = month === 1 ? new Date(year - 1, 12, day) : new Date(year, month - 1, day);
        daysToShow.push({ date, isCurrentMonth: false });
    }
    for (let day = 1; day <= daysInMonth[month]; day++) {
        const date = new Date(year, month - 1, day);
        daysToShow.push({ date, isCurrentMonth: true });
    }
    for (let day = 1; day <= daysFromOtherMonth.next; day++) {
        const date = month === 12 ? new Date(year + 1, 1, day) : new Date(year, month, day);
        daysToShow.push({ date, isCurrentMonth: false });
    }
    console.log(state)
    return {
        year,
        month,
        focusWeek,
        daysToShow,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        queryMonthsToListen: queryMonthsToListen(dispatch),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Calendar);

export default Container;
