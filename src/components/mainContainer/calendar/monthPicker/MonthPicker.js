// redux:
import { connect } from "react-redux";
import { Actions } from "../../../../actionCreators";
// view:
import MonthPicker from "./MonthPicker.view";

const mapStateToProps = (state) => {
    return {
        year: state.date.year,
        month: state.date.month,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increaseMonth: () => dispatch(Actions.increaseMonth()),
        decreaseMonth: () => dispatch(Actions.decreaseMonth()),
        increaseYear: () => dispatch(Actions.increaseYear()),
        decreaseYear: () => dispatch(Actions.decreaseYear()),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(MonthPicker);

export default Container;
