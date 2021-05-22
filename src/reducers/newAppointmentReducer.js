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
        timeWindows: []
    }
};

const initialState = initializeState();

export const newAppointmentReducer = function (state = initialState, action) {
    switch (action.type) {
        case "input/change":
            return { ...state, [action.payload.target]: action.payload.value };
    }

    return state;
};
