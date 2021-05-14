import React, { useState } from "react";
// components:
import NewAppointmentForm from "./newAppointmentForm/NewAppointmentForm";
import Menu from "./menu/Menu";
import Messenger from "./messenger/Messenger";
// api:
import { logOut } from "./../../../api";

const Sidebar = ({ firebase, setUser }) => {
    const [currentItem, setCurrentItem] = useState("form");
    return (
        <div className="sidebar">
            <Menu currentItem={currentItem} setCurrentItem={setCurrentItem} />
            {currentItem === "form" && <NewAppointmentForm firebase={firebase} /> }
            {currentItem === "chat" && <Messenger firebase={firebase} />}
            <button
                className="sidebar__logout"
                onClick={() => logOut(firebase, setUser)}
            >
                Wyloguj
            </button>
        </div>
    );
};

export default Sidebar;
