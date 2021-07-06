import React, { useState, useEffect, useRef } from "react";
// components:
import Message from "./message/Message";
// functions:
import { refreshState } from "../../../../functions";
// api:
import { sendMessage } from "../../../../api";

const Messenger = ({ messages, messageListener }) => {
    const [messageToSend, setMessageToSend] = useState("");
    const messengerBottom = useRef();
    useEffect(() => messageListener(), []);
    useEffect(() => messengerBottom.current.scrollIntoView(), [messages]);

    return (
        <div className="messenger">
            <h2 className="messenger__heading heading">Messages</h2>
            <div className="messenger__content">
                {messages.map(([id, msg]) => (
                    <Message key={id} id={id} msg={msg} />
                ))}
                <div className="messenger__bottom" ref={messengerBottom}></div>
            </div>
            <form
                className="messenger__form"
                onSubmit={sendMessage(
                    messageToSend,
                    setMessageToSend
                )}
            >
                <textarea
                    rows="4"
                    value={messageToSend}
                    onChange={refreshState(setMessageToSend)}
                    placeholder="Write your message here..."
                ></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Messenger;
