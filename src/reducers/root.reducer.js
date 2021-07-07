import { combineReducers } from "redux";
import { dateReducer } from "./date.reducer";
import { databaseReducer } from "./database.reducer";
import { newAppointmentReducer } from "./newAppointment.reducer";
import { optionsReducer } from "./options.reducer";
import { menuReducer } from "./menu.reducer";

export const reducer = combineReducers({
    date: dateReducer,
    database: databaseReducer,
    newAppointmentForm: newAppointmentReducer,
    options: optionsReducer,
    menu: menuReducer
});
