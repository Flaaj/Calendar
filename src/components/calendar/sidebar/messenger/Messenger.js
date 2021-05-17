// redux:
import { connect } from "react-redux";
// actions:
import { messageListener } from "../../../../actions/databaseActions";
// view:
import Messenger from "./Messenger.view";

const mapStateToProps = (state) => {
    const messages = state.database.messages;

    if (messages.empty) return {
        messages: []
    };
    return {
        messages,
        firebase: state.database.firebase,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        messageListener: messageListener(dispatch),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Messenger);

export default Container;
