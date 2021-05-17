import React from "react";

const Message = ({ user, date, msg }) => {
    return (
        <div className="message">
            <span className="message__author">{user}</span>
            <span className="message__time">{date}</span>
            <p className="message__text">{msg}</p>
        </div>
    );
};

export default Message;
