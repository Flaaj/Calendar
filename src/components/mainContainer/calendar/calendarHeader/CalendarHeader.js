import React from "react";
// styles:
import "./_calendarHeader.scss";
// constants:
import { weekdayNames } from "../../../../constants";

const CalendarHeader = () => (
    <div className="calendar-header">
        {weekdayNames.map(([full, short]) => (
            <div key={full} className="calendar-header__weekday-label">
                <span className="full">{full}</span>
                <span className="short">{short}</span>
            </div>
        ))}
    </div>
);

export default CalendarHeader;

