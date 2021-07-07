import { ActionTypes } from "../actionTypes";

const initialState = {
    currentMenuItem: "options",
}

export const menuReducer = function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.MENU_CHOOSE:
            return { ...state, currentMenuItem: action.payload };
    }

    return state;
}