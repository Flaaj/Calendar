import { ActionTypes } from "../actionTypes";

const initializeState = () => {
    const today = new Date().toLocaleDateString();
    const [month, year] = today.split(".").slice(1);
    return {
        today,
        year: +year,
        month: +month,
        focusWeek: -1,
        chosenDay: "",
        chosenAppointment: { id: "", date: "" },
    };
};

const initialState = initializeState();

export const dateReducer = function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.YEAR_INCREASE:
            return { ...state, year: state.year + 1 };
            
        case ActionTypes.YEAR_DECREASE:
            return { ...state, year: state.year - 1 };

        case ActionTypes.MONTH_INCREASE:
            if (state.month === 12) {
                return { ...state, year: state.year + 1, month: 1 };
            } else {
                return { ...state, month: state.month + 1 };
            }

        case ActionTypes.MONTH_DECREASE:
            if (state.month === 1) {
                return { ...state, year: state.year - 1, month: 12 };
            } else {
                return { ...state, month: state.month - 1 };
            }

        case ActionTypes.WEEK_FOCUS:
            if (state.focusWeek !== -1) {
                return { ...state, focusWeek: -1 };
            } else {
                return { ...state, focusWeek: action.payload };
            }

        case ActionTypes.APPOINTMENT_CHOOSE:
            const { id, date } = action.payload;
            return { ...state, chosenAppointment: { id, date } };

        case ActionTypes.DAY_CHOOSE:
            return { ...state, chosenDay: action.payload }
    }

    return state;
};
