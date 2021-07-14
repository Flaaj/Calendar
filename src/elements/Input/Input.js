import React from "react";
// style:
import "./_input.scss";

const Input = ({ type = "text", name, value, changeHandler, label, placeholder, options, rows, classes }) => {
    switch (type) {
        case "select":
            return (
                <div className="input-group">
                    <label className="label" htmlFor={name}>
                        {label}
                    </label>
                    <select
                        name={name}
                        id={name}
                        value={value}
                        onChange={changeHandler}
                        className="select"
                    >
                        {options}
                    </select>
                </div>
            );
        case "textarea":
            return (
                <div className="input-group">
                    <label className="label" htmlFor={name}>
                        {label}
                    </label>
                    <textarea
                        id={name}
                        name={name}
                        type={type}
                        className="input"
                        value={value}
                        onChange={changeHandler}
                        placeholder={placeholder}
                        rows={rows}
                    />
                </div>
            );
        default:
            return (
                <div className="input-group">
                    <label className="label" htmlFor={name}>
                        {label}
                    </label>
                    <input
                        id={name}
                        name={name}
                        type={type}
                        className="input"
                        value={value}
                        onChange={changeHandler}
                        placeholder={placeholder}
                    />
                </div>
            );
    }
};
export default Input;
