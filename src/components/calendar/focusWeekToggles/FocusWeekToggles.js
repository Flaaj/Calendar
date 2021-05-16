import React, { useState, useEffect } from "react";
// redux:
import { connect } from "react-redux";
// actions:
import { setFocusWeek } from "../../../actions/dateActions";

const FocusWeekToggles = ({ togglesNum, setFocusWeek, focusWeek, focusWeekClass }) => {

    useEffect(() => {
        
    })
    return (
        <div className="week-focus-toggles">
            {Array(togglesNum)
                .fill("")
                .map(
                    (_, index) =>
                        (focusWeek === -1 || focusWeek === index) && (
                            <button
                                className={"week-focus-toggles__toggle" + focusWeekClass}
                                onClick={setFocusWeek(index)}
                                key={`toggle-${index}`}
                            ></button>
                        )
                )}
        </div>
    );
};

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
