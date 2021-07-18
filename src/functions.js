// constants: 
import {monthNamesAltered as monthNames, daysInMonthDict} from "./constants"

export const getRefFromDateObject = (date, id) => {
    if (!(date && date instanceof Date)) {
        console.error("no date argument");
        return;
    }
    const [day, month, year] = date.toLocaleDateString().split(".");
    return id ? `${year}/${+month}/${+day}/${id}` : `${year}/${+month}/${+day}`;
};

export const dateDisplay = (date, isFullScreen) => {

    let dateString = "";
    if (isFullScreen) {
        dateString += date
            .toLocaleDateString()
            .split(".")
            .map((el, i) => (i === 1 ? monthNames[+el] : el))
            .join(" ");
    } else {
        dateString += date.toLocaleDateString().split(".")[0];
    }
    return dateString;
};

export const refreshState = (setState) => {
    return ({ target: { value } }) => {
        setState(value);
    };
};


export const getTarget = (date) => {
    const dateString = date.toLocaleDateString();
    const [day, month, year] = dateString.replaceAll(".0", ".").split(".");
    const target = `${year}/${month}`;
    return { target, day, dateString };
};


export const mapIndexesToHours = () => {
    const hours = [];
    for (let i = 0; i < 45; i++) {
        const hour = 7 + ~~(i / 4);
        const minute = 15 * (i % 4) || "00";
        hours.push(`${hour}:${minute}`);
    }
    return hours;
};

export const nextDays = (date, num) => {
    const days = [];
    for (let i = 0; i < num; i++) {
        days.push(date.toLocaleDateString());
        date.setDate(date.getDate() + 1);
    }
    return days;
};

export const convertIndexToHour = (begin, index, type) => {
    let hour, minutes;
    switch (type) {
        case "start":
            hour = begin + ~~((index - 1) / 4);
            minutes = ((index - 1) % 4) * 15 || "00";
            return `${hour}:${minutes}`;
        case "end":
            hour = begin + ~~(index / 4);
            minutes = (index % 4) * 15 || "00";
            return `${hour}:${minutes}`;
        case "duration":
            hour = begin + ~~(index / 4);
            minutes = (index % 4) * 15 || "00";
            return `${hour ? hour + "godz" : ""} ${+minutes ? minutes + "m" : ""}`;
    }
};

export const getDaysToShowInMonth = (year, month) => {
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

    return daysToShow;
};