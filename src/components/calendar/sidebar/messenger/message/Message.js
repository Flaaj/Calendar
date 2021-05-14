import React from 'react';
// functions:
import { dateDisplay } from "../../../../../functions";

const Message = ({msg}) => {
    const getFormattedDateString = (date) => {
        return `${dateDisplay(date, true)} ${date.toLocaleTimeString()} `;
    };

    return (
        <div key={msg[0]} className="message">
            <span className="message__author">
                {msg[1].user}
            </span>
            <span className="message__time">
                {getFormattedDateString(new Date(msg[1].date))}
            </span>
            <p className="message__text">{msg[1].msg}</p>
        </div>
    );
}

export default Message;
