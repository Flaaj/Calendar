// constants: 
import {monthNamesAltered as monthNames} from "./constants"

export const getRefFromDateObject = (date, id) => {
    if (!(date && date instanceof Date)) {
        console.error("no date argument");
        return;
    }
    const [day, month, year] = date.toLocaleDateString().split(".");
    return id ? `${year}/${+month}/${+day}/${id}` : `${year}/${+month}/${+day}`;
};

// export const isToday = (date) => {
//     return date.toLocaleDateString() === new Date().toLocaleDateString();
// };

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