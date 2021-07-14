// functions:
import { ActionTypes } from "../actionTypes";
import { getTarget } from "../functions";

const initializeState = () => {
    return {
        firebase: {},
        initialized: false,
        user: undefined,
        logged: false,
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
        case ActionTypes.FIREBASE_SAVE:
            return { ...state, firebase: action.payload };

        case ActionTypes.FIREBASE_PRELOGIN:
            return { ...state, error: false };

        case ActionTypes.FIREBASE_LOGIN_SUCCESSFUL:
            return {
                ...state,
                user: action.payload,
                logged: true,
                error: false,
            };

        case ActionTypes.FIREBASE_LOGIN_FAILED:
            return { ...state, error: true };

        case ActionTypes.FIREBASE_AUTH_STATE_CHANGE:
            return { ...state, user: action.payload, logged: action.payload ? true : false };

        case ActionTypes.MESSAGES_UPDATE:
            return { ...state, messages: action.payload };

        case ActionTypes.DATA_UPDATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.target]: action.payload.data,
                },
            };

        case ActionTypes.APPOINTMENT_DATA_COPY:
            const { id, date } = action.payload;
            const { target, day } = getTarget(date);
            const data = state.data[target][day][id];
            data.from = data.timeWindows[0] + "";
            data.to = data.timeWindows[data.timeWindows.length - 1] + "";
            return { ...state, chosenAppointment: state.data[target][day][id] };

        case ActionTypes.APPOINTMENT_DATA_CHANGE:
            return {
                ...state,
                chosenAppointment: {
                    ...state.chosenAppointment,
                    [action.payload.target]: action.payload.value,
                },
            };
    }
    return state;
};
