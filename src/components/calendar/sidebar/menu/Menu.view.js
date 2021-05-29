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
                        Nowa rezerwacja
                    </li>
                    <li
                        className={currentMenuItem === "chat" ? "current" : ""}
                        onClick={() => chooseMenuItem("chat")}
                    >
                        Wiadomości
                    </li>
                    <li
                        className={currentMenuItem === "terms" ? "current" : ""}
                        onClick={() => chooseMenuItem("terms")}
                    >
                        Wolne terminy
                    </li>
                    <li
                        className={currentMenuItem === "options" ? "current" : ""}
                        onClick={() => chooseMenuItem("options")}
                    >
                        Opcje
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
