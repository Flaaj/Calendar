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
        case "input/change":
            return { ...state, [action.payload.target]: action.payload.value };
        case "free-term/choose":
            let [day, month, year] = action.payload.date.split(".");
            if (day.length == 1) day = "0" + day;
            if (month.length == 1) month = "0" + month;
            const dateFormatted = [year, month, day].join("-");
            return { ...state, date: dateFormatted, from: action.payload.from, to: action.payload.to };
    }

    return state;
};
