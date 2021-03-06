import React from "react";
// components:
import NewAppointmentForm from "./newAppointmentForm/NewAppointmentForm";
import Menu from "./menu/Menu";
import Messenger from "./messenger/Messenger";
import FreeTerms from "./freeTerms/FreeTerms";
import UpcomingReservations from "./upcomingReservations/UpcomingReservations";
import Options from "./options/Options";
// api:
import { logOut } from "../../../api";

const Sidebar = ({ currentMenuItem }) => {
    return (
        <div className="sidebar">
            <Menu />
            {currentMenuItem === "form" && <NewAppointmentForm />}
            {currentMenuItem === "chat" && <Messenger />}
            {currentMenuItem === "terms" && <FreeTerms />}
            {currentMenuItem === "upcoming" && <UpcomingReservations />}
            {currentMenuItem === "options" && <Options />}
            <button className="sidebar__logout" onClick={() => logOut()}>
                Wyloguj
            </button>
        </div>
    );
};

export default Sidebar;
