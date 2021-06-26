import React, { useEffect } from "react";
// components:
import DayContainer from "./dayContainer/DayContainer";
import MonthPicker from "./monthPicker/MonthPicker";
import CalendarHeader from "./calendarHeader/CalendarHeader";
import FocusWeekToggles from "./focusWeekToggles/FocusWeekToggles";

const Calendar = ({ year, month, focusWeek, daysToShow, queryMonthsToListen }) => {
    useEffect(() => queryMonthsToListen(month, year), [month, year]);
    return (
        <div className="calendar">
            <MonthPicker />
            <div className="calendar__row">
                <FocusWeekToggles togglesNum={~~(daysToShow.length / 7)} />
                <div className="calendar__container">
                    <CalendarHeader />
                    <div className="calendar__month">
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
    );
};

export default Calendar;
