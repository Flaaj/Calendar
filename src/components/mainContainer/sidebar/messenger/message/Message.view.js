import React from "react";
// api:
import { deleteMessage } from "../../../../../api";
// styles:
import "./_message.scss";

const Message = ({ id, user, date, msg }) => {
    return (
        <div className="message">
            <span className="message__author">{user}</span>
            <span className="message__time">{date}</span>
            <p className="message__text">
                {msg}
                <button className="message__delete" title="Usuń tą wiadomość" onClick={deleteMessage(id)}>
                    x
                </button>
            </p>
        </div>
    );
};

export default Message;
