import React from "react";
// redux:
import { connect } from "react-redux";
// functions:
import { dateDisplay } from "../../../../../functions";
// view:
import Message from "./Message.view";

const getFormattedDateString = (date) => {
    return `${dateDisplay(date, true)} ${date.toLocaleTimeString()} `;
};

const mapStateToProps = (state, props) => {
    const { user, date, msg } = props.msg;
    return {
        user,
        date: getFormattedDateString(new Date(date)),
        msg,
    };
};
const Container = connect(mapStateToProps)(Message);

export default Container;
