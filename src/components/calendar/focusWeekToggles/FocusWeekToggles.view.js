import React from "react";

const FocusWeekToggles = ({ togglesNum, setFocusWeek, focusWeek, focusWeekClass }) => {
    return (
        <div className="week-focus-toggles">
            {Array(togglesNum)
                .fill("").map((_, index) =>
                    (focusWeek === -1 || focusWeek === index) && (
                        <button
                            className={"week-focus-toggles__toggle" + focusWeekClass}
                            onClick={setFocusWeek(index)}
                            key={`toggle-${index}`}
                        ></button>
                    ))}
        </div>
    );
};

export default FocusWeekToggles;
