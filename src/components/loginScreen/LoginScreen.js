// redux:
import { connect } from "react-redux";
// view:
import LoginScreen from "./LoginScreen.view";

const mapStateToProps = (state) => ({
    error: state.database.error,
});

const Container = connect(mapStateToProps)(LoginScreen);

export default Container;
