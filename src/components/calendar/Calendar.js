import React, { useState, useEffect } from "react";
// components:
import DayContainer from "../dayContainer/DayContainer";
import MonthPicker from "../monthPicker/MonthPicker";
import CalendarHeader from "./calendarHeader/CalendarHeader";
import Sidebar from "./sidebar/Sidebar";
// assets:
import arrow from "../../../public/assets/arrow.svg";
// api:
import { queryMonthsToListen } from "../../api";
//constants:
import { daysInMonthDict } from "../../constants";

const Calendar = ({ firebase, setUser }) => {
    const [today] = useState(new Date());
    const [daysInWeekFromPreviousMonth, setDaysInWeekFromPreviousMonth] =
        useState(0);
    const [daysInWeekFromNextMonth, setDaysInWeekFromNextMonth] = useState(0);
    const [thisMonth, setThisMonth] = useState();
    const [thisYear, setThisYear] = useState();
    const [daysInMonth, setDaysInMonth] = useState(daysInMonthDict);
    const [daysToShow, setDaysToShow] = useState([]);
    const [appointmentsData, setAppointmentsData] = useState({});
    const [focusWeek, setFocusWeek] = useState(-1);

    const getDays = async (month, year) => {
        queryMonthsToListen(
            firebase,
            month,
            year,
            appointmentsData,
            setAppointmentsData
        );
    };

    useEffect(() => {
        const curDate = today.toLocaleDateString().split(".");
        setThisMonth(+curDate[1]);
        setThisYear(+curDate[2] + 1);
    }, [today]);

    useEffect(() => {
        gapYearHandler(thisYear, setDaysInMonth);
    }, [thisYear]);

    const gapYearHandler = (year, setDaysInMonth) => {
        if (year % 4 === 0) setDaysInMonth((prev) => ({ ...prev, 2: 29 }));
        else setDaysInMonth((prev) => ({ ...prev, 2: 28 }));
    };

    useEffect(() => {
        if (thisMonth && thisYear) {
            setDaysInWeekFromPreviousMonth(
                (new Date(thisYear, thisMonth - 1, 1).getDay() + 6) % 7
            );
            setDaysInWeekFromNextMonth(
                6 - ((new Date(thisYear, thisMonth, 0).getDay() + 6) % 7)
            );
        }

        getDays(thisMonth, thisYear);
    }, [thisMonth, thisYear]);

    useEffect(() => {
        const dates = [];
        for (let day = 1 - daysInWeekFromPreviousMonth; day <= 0; day++) {
            const date =
                thisMonth === 1
                    ? new Date(thisYear - 1, 12, day)
                    : new Date(thisYear, thisMonth - 1, day);

            dates.push({ date, isCurrentMonth: false });
        }

        for (let day = 1; day <= daysInMonth[thisMonth]; day++) {
            const date = new Date(thisYear, thisMonth - 1, day);
            dates.push({ date, isCurrentMonth: true });
        }

        for (let day = 1; day <= daysInWeekFromNextMonth; day++) {
            const date =
                thisMonth === 12
                    ? new Date(thisYear + 1, 1, day)
                    : new Date(thisYear, thisMonth, day);
            dates.push({ date, isCurrentMonth: false });
        }

        setDaysToShow(dates);
    }, [daysInWeekFromPreviousMonth, daysInWeekFromNextMonth]);
    
    const changeMonth = (month, year, direction) => {
        let newMonth, newYear;
        if (direction === "up") {
            newMonth = (month % 12) + 1;
            newYear = newMonth === 1 ? year + 1 : year;
        } else if (direction === "down") {
            newMonth = ((month + 10) % 12) + 1;
            newYear = newMonth === 12 ? year - 1 : year;
        }
        setThisMonth(newMonth);
        setThisYear(newYear);
    };

    const changeYear = (direction) => {
        if (direction === "up") setThisYear((year) => year + 1);
        if (direction === "down") setThisYear((year) => year - 1);
    };

    const getTheDayData = (date) => {
        const dateString = date.toLocaleDateString();
        const [day, month, year] = dateString.replaceAll(".0", ".").split(".");
        const queryString = `${year}/${month}`;
        const data = appointmentsData[queryString]
            ? appointmentsData[queryString][day]
            : "";
        return [dateString, data];
    };

    return (
        <div className="app-wrapper">
            <div className="calendar">
                <MonthPicker
                    month={thisMonth}
                    year={thisYear}
                    increaseMonth={() => changeMonth(thisMonth, thisYear, "up")}
                    decreaseMonth={() => changeMonth(thisMonth, thisYear, "down")}
                    increaseYear={() => changeYear("up")}
                    decreaseYear={() => changeYear("down")}
                />
                <div className="calendar__row">
                    <div className="weekFocusToggles">
                        {new Array(~~(daysToShow.length / 7)).fill("").map(
                            (week, index) =>
                                (focusWeek === -1 || focusWeek === index) && (
                                    <button
                                        className="weekFocusToggles__toggle"
                                        onClick={() =>
                                            setFocusWeek((week) =>
                                                week === -1 ? index : -1
                                            )
                                        }
                                        key={`toggle-${index}`}
                                    >
                                        <span>
                                            {focusWeek === -1
                                                ? "rozszerz"
                                                : "powrót"}
                                        </span>
                                    </button>
                                )
                        )}
                    </div>
                    <div className="calendar__container">
                        <CalendarHeader />
                        <div className={"calendar__month"}>
                            {daysToShow.map(
                                ({ date, isCurrentMonth }, index) => {
                                    const [dateString, data] =
                                        getTheDayData(date);
                                    return (
                                        (focusWeek === -1 ||
                                            focusWeek === ~~(index / 7)) && (
                                            <DayContainer
                                                key={dateString}
                                                date={date}
                                                isCurrentMonth={isCurrentMonth}
                                                firebase={firebase}
                                                data={data}
                                            />
                                        )
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar firebase={firebase} setUser={setUser} />
        </div>
    );
};

export default Calendar;
