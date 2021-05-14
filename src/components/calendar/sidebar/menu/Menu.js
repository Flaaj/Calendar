import React from "react";

const Menu = ({ currentItem, setCurrentItem }) => {
    return (
        <div className="menu">
            <h2>Menu</h2>
            <nav>
                <ul>
                    <li
                        className={currentItem === "form" ? "current" : ""}
                        onClick={() => setCurrentItem("form")}
                    >
                        Nowa rezerwacja
                    </li>
                    <li
                        className={currentItem === "chat" ? "current" : ""}
                        onClick={() => setCurrentItem("chat")}
                    >
                        Wiadomości
                    </li>
                    <li
                        className={currentItem === "terms" ? "current" : ""}
                        onClick={() => setCurrentItem("terms")}
                    >
                        Wolne terminy
                    </li>
                    <li
                        className={currentItem === "options" ? "current" : ""}
                        onClick={() => setCurrentItem("options")}
                    >
                        Opcje
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
