import React from "react";

const CalendarHeader = () => {

    return (
        <div className="calendar-header">
            {weekdayNames.map(([full, short]) => (
                <div key={full} className="calendar-header__weekday-label">
                    <span className="full">{full}</span>
                    <span className="short">{short}</span>
                </div>
            ))}
        </div>
    );
};

export default CalendarHeader;

const weekdayNames = [
    ["Monday",    "Mon."],
    ["Tuesday",   "Tue."],
    ["Wednesday", "Wed."],
    ["Thursday",  "Thu."],
    ["Friday",    "Fri."],
    ["Saturday",  "Sat."],
    ["Sunday",    "Sun."],
];

// const weekdayNames = [
//     ["Poniedziałek", "Pn."],
//     ["Wtorek",       "Wt."],
//     ["Środa",        "Śr."],
//     ["Czwartek",     "Cz."],
//     ["Piątek",       "Pt."],
//     ["Sobota",       "Sb."],
//     ["Niedziela",    "Nd."],
// ];