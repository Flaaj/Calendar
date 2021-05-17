import React, { useState, useEffect } from "react";
// redux:
import { connect } from "react-redux";
// actions:
import { setFocusWeek } from "../../../actions/dateActions";
// view:
import FocusWeekToggles from "./FocusWeekToggles.view";

const mapStateToProps = (state) => {
    return {
        focusWeekClass: state.date.focusWeek !== -1 ? " focused" : "",
        focusWeek: state.date.focusWeek,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setFocusWeek: setFocusWeek(dispatch),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(FocusWeekToggles);

export default Container;
