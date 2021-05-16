import React from 'react';
// functions:
import { dateDisplay } from "../../../../../functions";

const Message = ({msg}) => {
    const getFormattedDateString = (date) => {
        return `${dateDisplay(date, true)} ${date.toLocaleTimeString()} `;
    };

    return (
        <div className="message">
            <span className="message__author">
                {msg.user}
            </span>
            <span className="message__time">
                {getFormattedDateString(new Date(msg.date))}
            </span>
            <p className="message__text">{msg.msg}</p>
        </div>
    );
}

export default Message;
