const initialState = {
    currentMenuItem: "form",
}

export const menuReducer = function (state = initialState, action) {
    switch (action.type) {
        case "menu/choose":
            return { ...state, currentMenuItem: action.payload };
    }

    return state;
}