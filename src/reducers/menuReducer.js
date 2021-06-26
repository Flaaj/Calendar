const initialState = {
    currentMenuItem: "options",
}

export const menuReducer = function (state = initialState, action) {
    switch (action.type) {
        case "menu/choose":
            return { ...state, currentMenuItem: action.payload };
    }

    return state;
}