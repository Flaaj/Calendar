import React, { useState, useEffect, useRef } from "react";
// redux:
import { connect } from "react-redux";
// actions:
import { messageListener } from "../../../../actions/databaseActions";
// components:
import Message from "./message/Message";
// functions:
import { refreshState } from "../../../../functions";
// api:
import { sendMessage } from "../../../../api";

const Messenger = ({ firebase, messages, messageListener }) => {
    const [messageToSend, setMessageToSend] = useState("");
    const messengerBottom = useRef();

    useEffect(() => {
        messageListener();
    }, []);

    useEffect(() => {
        messengerBottom.current.scrollIntoView();
    }, [messages]);

    return (
        <div className="messenger">
            <div className="messenger__content">
                {messages.map(([id, msg]) => (
                    <Message key={id} msg={msg} />
                ))}
                <div className="messenger__bottom" ref={messengerBottom}></div>
            </div>
            <form className="messenger__form" onSubmit={sendMessage(firebase, messageToSend, setMessageToSend)}>
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

const mapStateToProps = (state) => {
    return {
        messages: state.database.messages,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        messageListener: messageListener(dispatch),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Messenger);

export default Container;
