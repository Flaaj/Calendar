// constants: 
import {monthNamesAltered as monthNames, daysInMonthDict} from "./constants"

// returns reference to an an appointments array, if didnt provide id as parameter,
// or if id is provided, gets reference to this exact appointment
export const getRefFromDateObject = (date, id) => {
    if (!(date && date instanceof Date)) {
        console.error("no date argument");
        return;
    }
    const [day, month, year] = date.toLocaleDateString().split(".");
    return id ? `${year}/${+month}/${+day}/${id}` : `${year}/${+month}/${+day}`;
};

// formats date to be be displayed on the day container header
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
// returns the target string used for querying database, day, and a nicely formatted date
// TODO: this function and two above are quite similar. Rethink and redesign it.
export const getTarget = (date) => {
    const dateString = date.toLocaleDateString();
    const [day, month, year] = dateString.replaceAll(".0", ".").split(".");
    const target = `${year}/${month}`;
    return { target, day, dateString };
};

// helper function that makes changing of inputs state clearer
// TODO: add all inputs' state to store and remove this function from here as it will not be needed
export const refreshState = (setState) => {
    return ({ target: { value } }) => {
        setState(value);
    };
};


// returns an array with next num days after given date, including this date.
export const nextDays = (date, num) => {
    const days = [];
    for (let i = 0; i < num; i++) {
        days.push(date.toLocaleDateString());
        date.setDate(date.getDate() + 1);
    }
    return days;
};


// returns an array of strings with times for each 15 minutes between 7:00 a.m. and 6:00 p.m.
export const mapIndexesToHours = () => {
    const hours = [];
    for (let i = 0; i < 45; i++) {
        const hour = 7 + ~~(i / 4);
        const minute = 15 * (i % 4) || "00";
        hours.push(`${hour}:${minute}`);
    }
    return hours;
};

// analogically to the function above, but instead of array, returns a single string converted from a index given as a parameter
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

// returns the days to show on a calendar in a given month and year, including days from previous and next month.
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

// a helper function that sorts appointments data by the beginning time, for the purpose of imporving displayability on the grid.
export const sortAppointmentsDataByTime = (data) => {
    const sortedData = Object.entries(data);
    sortedData.sort((a, b) => {
        const A = a[1].timeWindows;
        const B = b[1].timeWindows;
        if (A[0] > B[0]) {
            return 1;
        } else if (A[0] === B[0]) {
            const aL = A.length - 1;
            const bL = B.length - 1;
            if (aL > bL) return 1;
            else return -1;
        } else {
            return -1;
        }
    });
    return sortedData;
};

// as there is a possiblity that there are 2 or more appointments at the same time,
// there is a need for calculating the width that each appointment window takes
// on the displaying grid. There are 12 columns. Each appointment gets as narrow
// as it needs. If there are two appointments at 9 a.m, both of them will have 
// width of maximum 6 columns. If one of those appointments lasts to 10 a.m, and there
// will be two more appointments at 10 a.m., they all will have the width of 4 columns
// so that at 9 a.m there will be a total of 10 columns (6 + 4) and 2 columns will be empty. 
export const getAppointmentsGridColSpan = (data) => {
    const dict = {};

    data.forEach(([_, appointment]) => {
        const { timeWindows } = appointment;
        for (const timeWindow of timeWindows) {
            dict[timeWindow] = dict[timeWindow] ? dict[timeWindow] + 1 : 1;
        }
    });

    const result = [];
    data.forEach(([_, appointment]) => {
        const { timeWindows } = appointment;
        result.push(
            timeWindows.reduce((p, c) => {
                return dict[c] > p ? dict[c] : p;
            }, 1)
        );
    });
    return result.map((r) => `span-${Math.max(12 / r, 2)}`);
};