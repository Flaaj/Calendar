const initializeState = () => {
    return {
        firebase: {},
        initialized: false,
        user: undefined,
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
    }
    return state;
};
