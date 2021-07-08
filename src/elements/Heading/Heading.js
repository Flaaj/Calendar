import React from "react";
// style:
import "./_heading.scss";

const Heading = ({ level, text, classNames }) => {
    let classes = "heading"
    if (typeof classNames == "string") {
        classes += ` ${classNames}`
    } else if (typeof classNames == "object") {
        classes += ` ${classNames.join(" ")}`
    }
    
    switch (level) {
        case "h1":
            return <h1 className={classes}>{text}</h1>;
        case "h2":
            return <h2 className={classes}>{text}</h2>;
        case "h3":
            return <h3 className={classes}>{text}</h3>;
        case "h4":
            return <h4 className={classes}>{text}</h4>;
        case "h5":
            return <h5 className={classes}>{text}</h5>;
        case "h6":
            return <h6 className={classes}>{text}</h6>;
    }
};

export default Heading;
