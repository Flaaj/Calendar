import React from "react";
//styles:
import "./_focusWeekToggles.scss";

const FocusWeekToggles = ({ togglesNum, setFocusWeek, focusWeek, focusWeekClass }) => {
    return (
        <div className="week-focus-toggles">
            {Array(togglesNum)
                .fill("")
                .map(
                    (_, index) =>
                        (focusWeek === -1 || focusWeek === index) && (
                            <div className="toggle" key={`toggle-${index}`}>
                                <div className="toggle__spacing"></div>
                                <button
                                    className={"toggle__button" + focusWeekClass}
                                    onClick={() => setFocusWeek(index)}
                                ></button>
                            </div>
                        )
                )}
        </div>
    );
};

export default FocusWeekToggles;
