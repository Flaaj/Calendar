import { ActionTypes } from "../actionTypes";

const initialState = {
    currentMenuItem: "form",
    menuItems: [
        { name: "Nowa rezerwacja", key: "form" },
        { name: "Wiadomości", key: "chat" },
        { name: "Wolne terminy", key: "terms" },
        { name: "Najbliższe rezerwacje", key: "upcoming" },
        { name: "Opcje", key: "options" },
    ],
};

export const menuReducer = function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.MENU_CHOOSE:
            return { ...state, currentMenuItem: action.payload };
    }

    return state;
};
