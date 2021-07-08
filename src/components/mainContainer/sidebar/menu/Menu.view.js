import React from "react";
// elements:
import Heading from "../../../../elements/Heading/Heading";
import Button from "../../../../elements/Button/Button";
// styles:
import "./_menu.scss";

const Menu = ({ menuItems, currentMenuItem, chooseMenuItem }) => {
    return (
        <div className="menu">
            <Heading level="h2" text="Menu" classNames={["siema", "elo"]} />
            <nav>
                <ul className="menu__list">
                    {menuItems.map((item) => (
                        <li className="menu__item" key={item.key}>
                            <Button
                                text={item.name}
                                classNames={currentMenuItem === item.key && "current"}
                                clickHandle={() => chooseMenuItem(item.key)}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
