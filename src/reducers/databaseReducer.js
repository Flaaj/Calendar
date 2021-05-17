const initializeState = () => {
    return {
        firebase: {},
        initialized: false,
        user: undefined,
        messages: [],
        data: {},
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
    }
    return state;
};
