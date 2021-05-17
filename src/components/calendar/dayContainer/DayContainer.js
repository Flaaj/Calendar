// redux:
import { connect } from "react-redux";
// view:
import DayContainer from "./DayContainer.view";

const mapStateToProps = (state, props) => {
    const dateString = props.date.toLocaleDateString();
    const [day, month, year] = dateString.replaceAll(".0", ".").split(".");
    const target = `${year}/${month}`;

    return {
        data: state.database.data[target]
            ? state.database.data[target][day]
            : {},
        firebase: state.database.firebase,
    };
};
const Container = connect(mapStateToProps)(DayContainer);

export default Container;
