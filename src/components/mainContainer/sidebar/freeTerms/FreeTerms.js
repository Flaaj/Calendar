// redux:
import { connect } from "react-redux";
// view:
import FreeTerms from "./FreeTerms.view";
//functions:
import { nextDays, convertIndexToHour } from "../../../../functions";

const mapStateToProps = (state) => {
    const terms = {};
    for (let date of nextDays(new Date(), 14)) {
        const [day, month, year] = date.split(".");
        const ref = `${year}/${+month}`;
        const free = [[]];
        const taken = [];
        const monthData = state.database.data[ref];
        if (monthData) {
            if (monthData[day]) {
                const dayData = Object.entries(monthData[+day]);
                dayData.forEach(([_, data]) => {
                    taken.push(...data.timeWindows);
                });
                let counter = 0;
                for (let i = 1; i <= 44; i++) {
                    if (!taken.includes(i)) {
                        const size = free[counter].length - 1;
                        if (i > 1 && i - 1 !== free[counter][size]) free[++counter] = [];
                        free[counter].push(i);
                    }
                }
                terms[date] = [];
                for (const term of free) {
                    const begin = 7; // 7:00 a.m.
                    const size = term.length;
                    const duration = convertIndexToHour(0, size, "duration");
                    const start = convertIndexToHour(begin, term[0], "start");
                    const end = convertIndexToHour(begin, term[size - 1], "end");
                    terms[date].push({ duration, start, end, startIndex: term[0], endIndex: term[size - 1] });
                }
            } else {
                terms[date] = [];
                terms[date].push({
                    duration: "11godz",
                    start: "7:00",
                    end: "18:00",
                    startIndex: 0,
                    endIndex: 44,
                });
            }
        }
    }
    return {
        terms: Object.entries(terms),
    };
};

const mapDispatchToProps = (dispatch) => ({
    termDblClick: (startIndex, endIndex, date) => {
        dispatch({ type: "menu/choose", payload: "form" });
        dispatch({
            type: "free-term/choose",
            payload: {
                from: startIndex,
                to: endIndex,
                date,
            },
        });
    },
});

const Container = connect(mapStateToProps, mapDispatchToProps)(FreeTerms);

export default Container;
