// redux:
import { connect } from "react-redux";
// view:
import Options from "./Options.view";

const mapStateToProps = (state) => {
    return {
        freeTermsDays: state.options.freeTermsDays,
        upcomingDays: state.options.upcomingDays
    };
};

const mapDispatchToProps = (dispatch) => ({
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Options);

export default Container;
