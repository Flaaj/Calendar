import React, { useState, useEffect, useRef } from "react";
// components:
import Message from "./message/Message";
// functions:
import { refreshState } from "../../../../functions";
// api:
import { messageListener, sendMessage } from "../../../../api";

const Messenger = ({ firebase }) => {
    const [messages, setMessages] = useState([]);
    const [messageToSend, setMessageToSend] = useState("");
    const bottom = useRef();

    useEffect(() => {
        messageListener(firebase, setMessages);
    }, []);

    useEffect(() => {
        bottom.current.scrollIntoView();
    }, [messages]);

    return (
        <div className="messenger">
            <div className="messenger__content">
                {messages.map((msg) => (
                    <Message key={msg[0]} msg={msg} />
                ))}
                <div className="messenger__bottom" ref={bottom}></div>
            </div>
            <form
                className="messenger__form"
                onSubmit={sendMessage(
                    firebase,
                    messageToSend,
                    setMessageToSend
                )}
            >
                <textarea
                    rows="4"
                    value={messageToSend}
                    onChange={refreshState(setMessageToSend)}
                    placeholder="Treść wiadomości..."
                ></textarea>
                <button type="submit">Wyślij</button>
            </form>
        </div>
    );
};

export default Messenger;
