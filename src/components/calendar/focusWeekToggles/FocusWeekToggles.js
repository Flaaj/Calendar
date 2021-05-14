import React, { useState, useEffect } from "react";

const FocusWeekToggles = ({ togglesNum, focusWeek, setFocusWeek }) => {
    const [togglesArray, setTogglesArray] = useState(
        Array(togglesNum).fill("")
    );

    useEffect(() => {
        setTogglesArray(Array(togglesNum).fill(""));
    }, [togglesNum]);

    const toggleFocus = (index) => {
        setFocusWeek((week) => (week === -1 ? index : -1));
    };

    return (
        <div className="week-focus-toggles">
            {togglesArray.map((_, index) =>
                focusWeek === -1 ? (
                    <button
                        className="week-focus-toggles__toggle"
                        onClick={() => toggleFocus(index)}
                        key={`toggle-${index}`}
                    ></button>
                ) : (
                    focusWeek === index && (
                        <button
                            className="week-focus-toggles__toggle focused"
                            onClick={() => toggleFocus(index)}
                            key={`toggle-${index}`}
                        ></button>
                    )
                )
            )}
        </div>
    );
};

export default FocusWeekToggles;
