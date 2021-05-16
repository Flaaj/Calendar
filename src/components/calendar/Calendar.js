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

const Calendar = ({
    firebase,
    setUser,
    thisMonth,
    thisYear,
    focusWeek,
    appointmentsData,
    daysInMonth,
    daysFromOtherMonth,
    queryMonthsToListen,
}) => {
    const [daysToShow, setDaysToShow] = useState([]);

    useEffect(() => {
        queryMonthsToListen(thisMonth, thisYear);
    }, [thisMonth, thisYear]);

    useEffect(() => {
        const dates = [];
        for (let day = 1 - daysFromOtherMonth.previous; day <= 0; day++) {
            const date = thisMonth === 1 ? new Date(thisYear - 1, 12, day) : new Date(thisYear, thisMonth - 1, day);
            dates.push({ date, isCurrentMonth: false });
        }

        for (let day = 1; day <= daysInMonth[thisMonth]; day++) {
            const date = new Date(thisYear, thisMonth - 1, day);
            dates.push({ date, isCurrentMonth: true });
        }

        for (let day = 1; day <= daysFromOtherMonth.next; day++) {
            const date = thisMonth === 12 ? new Date(thisYear + 1, 1, day) : new Date(thisYear, thisMonth, day);
            dates.push({ date, isCurrentMonth: false });
        }

        setDaysToShow(dates);
    }, [daysFromOtherMonth]);

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
                                            key={getTheDayData(date)}
                                            date={date}
                                            isCurrentMonth={isCurrentMonth}
                                            firebase={firebase}
                                            // data={data}
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
    const year = state.date.year;
    const month = state.date.month;
    return {
        thisYear: year,
        thisMonth: month,
        focusWeek: state.date.focusWeek,
        appointmentsData: state.database.data,
        daysInMonth: year % 4 === 0 ? { ...daysInMonthDict, 2: 29 } : daysInMonthDict,
        daysFromOtherMonth: {
            previous: (new Date(year, month - 1, 1).getDay() + 6) % 7,
            next: 6 - ((new Date(year, month, 0).getDay() + 6) % 7),
        },
        daysToShow: () => {},
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        queryMonthsToListen: queryMonthsToListen(dispatch),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Calendar);

export default Container;
