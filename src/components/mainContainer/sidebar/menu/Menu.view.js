import React from "react";

const Menu = ({ currentMenuItem, chooseMenuItem }) => {
    return (
        <div className="menu">
            <h2 className="menu__heading">Menu</h2>
            <nav>
                <ul>
                    <li
                        className={currentMenuItem === "form" ? "current" : ""}
                        onClick={() => chooseMenuItem("form")}
                    >
                        New reservation
                    </li>
                    <li
                        className={currentMenuItem === "chat" ? "current" : ""}
                        onClick={() => chooseMenuItem("chat")}
                    >
                        Messages
                    </li>
                    <li
                        className={currentMenuItem === "terms" ? "current" : ""}
                        onClick={() => chooseMenuItem("terms")}
                    >
                        Free terms
                    </li>
                    <li
                        className={currentMenuItem === "upcoming" ? "current" : ""}
                        onClick={() => chooseMenuItem("upcoming")}
                    >
                        Upcoming reservations
                    </li>
                    {/* <li
                        className={currentMenuItem === "options" ? "current" : ""}
                        onClick={() => chooseMenuItem("options")}
                    >
                        Opcje
                    </li> */}
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
