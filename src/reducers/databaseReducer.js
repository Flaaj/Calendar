// functions:
import { getTarget } from "../functions";

const initializeState = () => {
    return {
        firebase: {},
        initialized: false,
        user: undefined,
        messages: [],
        data: {},
        chosenAppointment: {
            name: "",
            phone: "",
            email: "",
            from: "",
            to: "",
            note: "",
            date: "",
            color: "#000000",
            timeWindows: [],
        },
    };
};

const initialState = initializeState();

export const databaseReducer = function (state = initialState, action) {
    switch (action.type) {
        case "firebase/save":
            return { ...state, firebase: action.payload };
        case "firebase/prelogin":
            return { ...state, error: false };
        case "firebase/login-succesful":
            return {
                ...state,
                user: action.payload,
                error: false,
            };
        case "firebase/login-failed":
            return { ...state, error: true };
        case "firebase/auth-state-change":
            return { ...state, user: action.payload };
        case "messages/update":
            return { ...state, messages: action.payload };
        case "data/update":
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.target]: action.payload.data,
                },
            };
        case "appointment-data/copy":
            const { id, date } = action.payload;
            const { target, day } = getTarget(date);
            console.log(target, day)
            console.log(state.data[target][day])
            const data = state.data[target][day][id];
            data.from = data.timeWindows[0] + "";
            data.to = data.timeWindows[data.timeWindows.length - 1] + "";
            return { ...state, chosenAppointment: state.data[target][day][id] };
        case "appointment-data/change":
            return {
                ...state,
                chosenAppointment: { ...state.chosenAppointment, [action.payload.target]: action.payload.value },
            };
    }
    return state;
};
