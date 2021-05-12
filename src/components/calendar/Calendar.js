import React, { useState, useEffect } from "react";
// components:
import DayContainer from "../dayContainer/DayContainer";
import MonthPicker from "../monthPicker/MonthPicker";
import CalendarHeader from "./calendarHeader/CalendarHeader";
import Sidebar from "./sidebar/Sidebar";
// styles:
import "./calendar.scss";
// assets:
import arrow from "../../../public/assets/arrow.svg";

const Calendar = ({ firebase, setUser }) => {
    const [today] = useState(new Date());
    const [daysInWeekFromPreviousMonth, setDaysInWeekFromPreviousMonth] = useState(0);
    const [daysInWeekFromNextMonth, setDaysInWeekFromNextMonth] = useState(0);
    const [thisMonth, setThisMonth] = useState();
    const [thisYear, setThisYear] = useState();
    const [daysInMonth, setDaysInMonth] = useState({
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31,
    });
    const [daysToShow, setDaysToShow] = useState([]);
    const [appointmentsData, setAppointmentsData] = useState({});
    const [focusWeek, setFocusWeek] = useState(-1);

    const getDays = async (month, year) => {
        const monthsToQuery =
            month === 1
                ? [
                      [12, year - 1],
                      [1, year],
                      [2, year],
                  ]
                : month === 12
                ? [
                      [11, year],
                      [12, year],
                      [1, year + 1],
                  ]
                : [
                      [month - 1, year],
                      [month, year],
                      [month + 1, year],
                  ];
        monthsToQuery.forEach(([month, year]) => {
            const target = `${year}/${month}`;
            if (!appointmentsData[target]) {
                // console.log("new database listener from " + targconsoleet);console
                firebase
                    .database()
                    .ref(target)
                    .on("value", (snapshot) => {
                        if (snapshot.val()) {
                            setAppointmentsData((data) => ({
                                ...data,
                                [target]: snapshot.val(),
                            }));
                        } else {
                            setAppointmentsData((data) => ({
                                ...data,
                                [target]: true,
                            }));
                        }
                    });
            }
        });
    };

    useEffect(() => {
        const curDate = today.toLocaleDateString().split(".");
        setThisMonth(+curDate[1]);
        setThisYear(+curDate[2]);
    }, [today]);

    useEffect(() => {
        if (thisYear % 4 === 0) setDaysInMonth((prev) => ({ ...prev, 2: 29 }));
        else setDaysInMonth((prev) => ({ ...prev, 2: 28 }));
    }, [thisYear]);

    useEffect(() => {
        if (thisMonth && thisYear) {
            setDaysInWeekFromPreviousMonth((new Date(thisYear, thisMonth - 1, 1).getDay() + 6) % 7);
            setDaysInWeekFromNextMonth(6 - ((new Date(thisYear, thisMonth, 0).getDay() + 6) % 7));
        }

        getDays(thisMonth, thisYear);
    }, [thisMonth, thisYear]);

    useEffect(() => {
        const dates = [];
        for (let day = 1 - daysInWeekFromPreviousMonth; day <= 0; day++) {
            const date = thisMonth === 1 ? new Date(thisYear - 1, 12, day) : new Date(thisYear, thisMonth - 1, day);

            dates.push({ date, isCurrentMonth: false });
        }

        for (let day = 1; day <= daysInMonth[thisMonth]; day++) {
            const date = new Date(thisYear, thisMonth - 1, day);
            dates.push({ date, isCurrentMonth: true });
        }

        for (let day = 1; day <= daysInWeekFromNextMonth; day++) {
            const date = thisMonth === 12 ? new Date(thisYear + 1, 1, day) : new Date(thisYear, thisMonth, day);
            dates.push({ date, isCurrentMonth: false });
        }

        setDaysToShow(dates);
    }, [daysInWeekFromPreviousMonth, daysInWeekFromNextMonth]);

    const actualizeDate = (month, year) => {
        setThisMonth(month);
        setThisYear(year);
    };

    const decreaseMonth = (month, year) => {
        const newMonth = ((month + 10) % 12) + 1;
        const newYear = newMonth === 12 ? year - 1 : year;
        actualizeDate(newMonth, newYear);
    };

    const increaseMonth = (month, year) => {
        const newMonth = (month % 12) + 1;
        const newYear = newMonth === 1 ? year + 1 : year;
        actualizeDate(newMonth, newYear);
    };

    const changeYear = (direction) => {
        if (direction === "up") setThisYear((year) => year + 1);
        if (direction === "down") setThisYear((year) => year - 1);
    };

    const getTheDayData = (date) => {
        const dateString = date.toLocaleDateString();
        const [day, month, year] = dateString.replaceAll(".0", ".").split(".");
        const queryString = `${year}/${month}`;
        const data = appointmentsData[queryString] ? appointmentsData[queryString][day] : "";
        return [dateString, data];
    };

    return (
        <div className="app-wrapper">
            <div className="calendar">
                <MonthPicker
                    month={thisMonth}
                    year={thisYear}
                    decreaseMonth={() => decreaseMonth(thisMonth, thisYear)}
                    increaseMonth={() => increaseMonth(thisMonth, thisYear)}
                    changeYear={changeYear}
                />
                <div className="calendar__row">
                    <div className="weekFocusToggles">
                        {new Array(~~(daysToShow.length / 7)).fill("").map(
                            (week, index) =>
                                (focusWeek === -1 || focusWeek === index) && (
                                    <button
                                        className="weekFocusToggles__toggle"
                                        onClick={() => setFocusWeek((week) => (week === -1 ? index : -1))}
                                    >
                                        <span>{focusWeek === -1 ? "rozszerz" : "powrót"}</span>
                                    </button>
                                )
                        )}
                    </div>
                    <div className="calendar__container">
                        <CalendarHeader />
                        <div className={"calendar__month"}>
                            {daysToShow.map(({ date, isCurrentMonth }, index) => {
                                const [dateString, data] = getTheDayData(date);
                                return (
                                    (focusWeek === -1 || focusWeek === ~~(index / 7)) && (
                                        <DayContainer
                                            key={dateString}
                                            date={date}
                                            isCurrentMonth={isCurrentMonth}
                                            firebase={firebase}
                                            data={data}
                                        />
                                    )
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar firebase={firebase} setUser={setUser} />
        </div>
    );
};

export default Calendar;
