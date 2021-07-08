import React from "react";

const Input = ({ type, name, value, changeHandler, label, placeholder }) => {
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
            ;
        </div>
    );
};

export default Input;
