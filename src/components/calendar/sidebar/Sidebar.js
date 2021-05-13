import React from "react";
// components:
import NewAppointmentForm from "./newAppointmentForm/NewAppointmentForm";

const Sidebar = ({ firebase, setUser }) => {
    const logOut = () => {
        firebase.auth().signOut().then(() => {
            setUser(undefined);
        });
    };
    return (
        <div className="sidebar">
            <div className="menu"></div>
            <NewAppointmentForm firebase={firebase} />
            <button className="sidebar__logout" onClick={logOut}>Wyloguj</button>
        </div>
    );
};

export default Sidebar;
