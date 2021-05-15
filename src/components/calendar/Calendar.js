import React, { useState, useEffect } from "react";
// redux:
import { connect } from "react-redux";
// components:
import DayContainer from "./dayContainer/DayContainer";
import MonthPicker from "./monthPicker/MonthPicker";
import CalendarHeader from "./calendarHeader/CalendarHeader";
import Sidebar from "./sidebar/Sidebar";
import FocusWeekToggles from "./focusWeekToggles/FocusWeekToggles";
// api:
import { queryMonthsToListen } from "../../api";
//constants:
import { daysInMonthDict } from "../../constants";

const Calendar = ({ firebase, setUser, thisMonth, thisYear }) => {
    const [daysInWeekFromPreviousMonth, setDaysInWeekFromPreviousMonth] =
        useState(0);
    const [daysInWeekFromNextMonth, setDaysInWeekFromNextMonth] = useState(0);
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
                <MonthPicker />
                <div className="calendar__row">
                    <FocusWeekToggles
                        togglesNum={~~(daysToShow.length / 7)}
                        focusWeek={focusWeek}
                        setFocusWeek={setFocusWeek}
                    />
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

const mapStateToProps = (state) => {
    console.log(state);
    if (state) {
        return {
            thisYear: state.date.year,
            thisMonth: state.date.month,
        };
    }
};

const Container = connect(mapStateToProps)(Calendar);

export default Container;
