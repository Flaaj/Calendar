// redux:
import { connect } from "react-redux";
// view: 
import MonthPicker from "./MonthPicker.view"

const mapStateToProps = (state) => {
    return {
        year: state.date.year,
        month: state.date.month,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increaseMonth: () => dispatch({ type: "month/increase" }),
        decreaseMonth: () => dispatch({ type: "month/decrease" }),
        increaseYear: () => dispatch({ type: "year/increase" }),
        decreaseYear: () => dispatch({ type: "year/decrease" }),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(MonthPicker);

export default Container;
