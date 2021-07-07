import { ActionTypes } from "../actionTypes";

const initializeState = () => {
    return {
        name: "",
        phone: "",
        email: "",
        from: "1",
        to: "1",
        note: "",
        date: "",
        color: "#000000",
        timeWindows: [],
    };
};

const initialState = initializeState();

export const newAppointmentReducer = function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.NEW_APPOINTMENT_INPUT_CHANGE:
            return { ...state, [action.payload.target]: action.payload.value };
            
        case ActionTypes.FREE_TERM_CHOOSE:
            let { date, from, to } = action.payload;
            let [day, month, year] = date.split(".");

            if (day.length == 1) day = `0${day}`;
            if (month.length == 1) month = `0${month}`;

            date = `${year}-${month}-${day}`;
            return { ...state, date, from, to };
    }

    return state;
};
