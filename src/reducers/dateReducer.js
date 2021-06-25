const initializeState = () => {
    const today = new Date().toLocaleDateString();
    const [month, year] = today.split(".").slice(1);
    return {
        today,
        year: +year,
        month: +month,
        focusWeek: -1,
        currentMenuItem: "options",
        chosenDay: "",
        chosenAppointment: {id:"", date:""},
    };
};

const initialState = initializeState();

export const dateReducer = function (state = initialState, action) {
    switch (action.type) {
        case "year/increase":
            return { ...state, year: state.year + 1 };
        case "year/decrease":
            return { ...state, year: state.year - 1 };
        case "month/increase":
            if (state.month === 12) {
                return { ...state, year: state.year + 1, month: 1 };
            } else {
                return { ...state, month: state.month + 1 };
            }
        case "month/decrease":
            if (state.month === 1) {
                return { ...state, year: state.year - 1, month: 12 };
            } else {
                return { ...state, month: state.month - 1 };
            }
        case "week/focus":
            if (state.focusWeek !== -1) {
                return { ...state, focusWeek: -1 };
            } else {
                return { ...state, focusWeek: action.payload };
            }
        case "menu/choose":
            return { ...state, currentMenuItem: action.payload };
        case "appointment/choose":
            const { id, date } = action.payload;
            return { ...state, chosenAppointment: { id, date } };
        case "day/choose":
            return { ...state, chosenDay: action.payload}
    }

    return state;
};
