import { ActionTypes } from "../actionTypes";

const initializeState = () => {
    return {
        upcomingDays: 7,
        freeTermsDays: 14,
    };
};

const initialState = initializeState();

export const optionsReducer = function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.OPTION_UPDATE:
            return { ...state, [action.payload.optionName]: action.payload.value };
        case ActionTypes.OPTIONS_GET:
            return { ...state, ...action.payload };
    }
    return state;
};
