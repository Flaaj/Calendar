import React from "react";
// styles:
import "./_button.scss";

const Button = ({ text, clickHandle, classNames }) => {
    let classes = "button";
    if (typeof classNames == "string") {
        classes += ` ${classNames}`;
    } else if (typeof classNames == "object") {
        classes += ` ${classNames.join(" ")}`;
    }
    return (
        <button className={classes} onClick={clickHandle}>
            {text}
        </button>
    );
};

export default Button;
