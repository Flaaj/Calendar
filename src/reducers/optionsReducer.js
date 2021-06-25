const initializeState = () => {
    return {
        upcomingDays: 7,
        freeTermsDays: 14,
    };
};

const initialState = initializeState();

export const optionsReducer = function (state = initialState, action) {
    switch (action.type) {
        case "option/update":
            return { ...state, [action.payload.type]: action.payload.value };
        case "options/get":
            return { ...state, ...action.payload };
    }

    return state;
};
