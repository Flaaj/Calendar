// redux:
import { connect } from "react-redux";
// actions:
import { authenticate } from "../../actions/databaseActions";
// view:
import LoginScreen from "./LoginScreen.view"

const mapStateToProps = (state) => ({
    user: state.database.user,
    error: state.database.error,
});
const mapDispatchToProps = (dispatch) => ({
    authenticate: authenticate(dispatch),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export default Container;
