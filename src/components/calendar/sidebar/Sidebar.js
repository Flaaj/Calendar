import React from "react";
// redux:
import { connect } from "react-redux";
// components:
import NewAppointmentForm from "./newAppointmentForm/NewAppointmentForm";
import Menu from "./menu/Menu";
import Messenger from "./messenger/Messenger";
import FreeTerms from "./freeTerms/FreeTerms";
// api:
import { logOut } from "./../../../api";

const Sidebar = ({ firebase, currentMenuItem }) => {
    return (
        <div className="sidebar">
            <Menu />
            {currentMenuItem === "form" && (
                <NewAppointmentForm firebase={firebase} />
            )}
            {currentMenuItem === "chat" && <Messenger />}
            {currentMenuItem === "terms" && <FreeTerms />}
            <button
                className="sidebar__logout"
                onClick={() => logOut(firebase)}
            >
                Wyloguj
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentMenuItem: state.date.currentMenuItem,
        firebase: state.database.firebase
    };
};

const Container = connect(mapStateToProps)(Sidebar);

export default Container;
