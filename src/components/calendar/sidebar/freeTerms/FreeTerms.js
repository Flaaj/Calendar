// redux:
import { connect } from "react-redux";
// view:
import FreeTerms from "./FreeTerms.view";

const nextTwoWeeks = (date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
        days.push(date.toLocaleDateString());
        date.setDate(date.getDate() + 1);
    }
    return days;
};

const indexToHour = (begin, index, phase) => {
    if (phase === "start") {
        const hour = begin + ~~((index - 1) / 4);
        const minutes = ((index - 1) % 4) * 15 || "00";
        return `${hour}:${minutes}`;
    } else if (phase === "end") {
        const hour = begin + ~~(index / 4);
        const minutes = (index % 4) * 15 || "00";
        return `${hour}:${minutes}`;
    } else {
        const hour = begin + ~~(index / 4);
        const minutes = (index % 4) * 15 || "00";
        return `${hour ? hour + "godz" : ""} ${+minutes ? minutes + "m" : ""}`;
    }
};

const mapStateToProps = (state) => {
    const terms = {};
    for (let date of nextTwoWeeks(new Date())) {
        const [day, month, year] = date.split(".");
        const ref = `${year}/${+month}`;
        const free = [[]];
        const taken = [];
        const monthData = state.database.data[ref];
        if (monthData) {
            if (monthData[day]) {
                const dayData = Object.entries(monthData[+day]);
                dayData.forEach(([__, data]) => {
                    taken.push(...data.timeWindows);
                });
                let counter = 0;
                for (let i = 1; i <= 44; i++) {
                    if (!taken.includes(i)) {
                        const size = free[counter].length - 1;
                        if (i > 1 && i - 1 !== free[counter][size])
                            free[++counter] = [];
                        free[counter].push(i);
                    }
                }
                terms[date] = [];
                for (let term of free) {
                    const begin = 7; // 7:00 a.m.
                    const size = term.length - 1;
                    const duration = indexToHour(0, size, "duration");
                    const start = indexToHour(begin, term[0], "start");
                    const end = indexToHour(begin, term[size - 1], "end");
                    terms[date].push({ duration, start, end });
                }
            } else {
                terms[date] = [];
                terms[date].push({
                    duration: "11godz",
                    start: "7:00",
                    end: "18:00",
                });
            }
        }
    }
    return {
        terms: Object.entries(terms),
    };
};

const Container = connect(mapStateToProps)(FreeTerms);

export default Container;
