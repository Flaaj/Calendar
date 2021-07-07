import { ActionTypes } from "./actionTypes";

export const Actions = {
    
    saveFirebaseToStore: (firebase) => ({
        type: ActionTypes.FIREBASE_SAVE,
        payload: firebase,
    }),

    prelogin: () => ({
        type: ActionTypes.FIREBASE_PRELOGIN,
    }),

    loginSuccessful: (user) => ({
        type: ActionTypes.FIREBASE_LOGIN_SUCCESSFUL,
        payload: user,
    }),

    loginFailed: () => ({
        type: ActionTypes.FIREBASE_LOGIN_FAILED,
    }),

    authStateChange: (user) => ({
        type: ActionTypes.FIREBASE_AUTH_STATE_CHANGE,
        payload: user,
    }),

    updateMessages: (messagesObject) => ({
        type: ActionTypes.MESSAGES_UPDATE,
        payload: messagesObject,
    }),

    updateData: (target, data) => ({
        type: ActionTypes.DATA_UPDATE,
        payload: {
            target,
            data,
        },
    }),

    focusViewOnWeek: (week) => ({
        type: ActionTypes.WEEK_FOCUS,
        payload: week,
    }),

    getUserOptions: (options) => ({
        type: ActionTypes.OPTIONS_GET,
        payload: options,
    }),

    updateOption: (optionName, value) => ({
        type: ActionTypes.OPTION_UPDATE,
        payload: {
            optionName,
            value,
        },
    }),

    chooseAppointment: (id, date) => ({
        type: ActionTypes.APPOINTMENT_CHOOSE,
        payload: { id, date },
    }),

    chooseDay: (day) => ({
        type: ActionTypes.DAY_CHOOSE,
        payload: day,
    }),

    copyAppointmentDataToForm: (id, date) => ({
        type: ActionTypes.APPOINTMENT_DATA_COPY,
        payload: { id, date },
    }),

    updateAppointmentData: (target, value) => ({
        type: ActionTypes.APPOINTMENT_DATA_CHANGE,
        payload: {
            target,
            value,
        },
    }),

    increaseMonth: () => ({
        type: ActionTypes.MONTH_INCREASE,
    }),

    decreaseMonth: () => ({
        type: ActionTypes.MONTH_DECREASE,
    }),

    increaseYear: () => ({
        type: ActionTypes.YEAR_INCREASE,
    }),

    decreaseYear: () => ({
        type: ActionTypes.YEAR_DECREASE,
    }),

    chooseMenuItem: (itemName) => ({
        type: ActionTypes.MENU_CHOOSE,
        payload: itemName,
    }),

    chooseFreeTerm: (startIndex, endIndex, date) => ({
        type: ActionTypes.FREE_TERM_CHOOSE,
        payload: {
            from: startIndex,
            to: endIndex,
            date,
        },
    }),

    changeNewAppointmentInput: (target, value) => ({
        type: ActionTypes.NEW_APPOINTMENT_INPUT_CHANGE,
        payload: {
            target,
            value,
        },
    }),
};
