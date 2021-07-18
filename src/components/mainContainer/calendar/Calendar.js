// redux:
import { connect } from "react-redux";
// actions:
import { queryMonthsToListen } from "../../../api";
// helper functions:
import { getDaysToShowInMonth } from "../../../functions";
// view:
import Calendar from "./Calendar.view";

const mapStateToProps = (state) => {
    const { year, month, focusWeek } = state.date;
    const daysToShow = getDaysToShowInMonth(year, month);
    return {
        year,
        month,
        focusWeek,
        daysToShow,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        queryMonthsToListen: queryMonthsToListen(dispatch),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Calendar);

export default Container;
