import React from "react";
// components:
import NewAppointmentForm from "./newAppointmentForm/NewAppointmentForm";
import Menu from "./menu/Menu";
import Messenger from "./messenger/Messenger";
import FreeTerms from "./freeTerms/FreeTerms";
import UpcomingReservations from "./upcomingReservations/UpcomingReservations";
import Options from "./options/Options";
// elements:
import Button from "../../../elements/Button/Button";
// api:
import { logOut } from "../../../api";
// styles:
import "./_sidebar.scss";

const Sidebar = ({ currentMenuItem }) => {
    return (
        <div className="sidebar">
            <Menu />
            {currentMenuItem === "form" && <NewAppointmentForm />}
            {currentMenuItem === "chat" && <Messenger />}
            {currentMenuItem === "terms" && <FreeTerms />}
            {currentMenuItem === "upcoming" && <UpcomingReservations />}
            {currentMenuItem === "options" && <Options />}
            <Button text="Wyloguj" classNames="sidebar__logout" clickHandle={() => logOut()} />
        </div>
    );
};

export default Sidebar;
