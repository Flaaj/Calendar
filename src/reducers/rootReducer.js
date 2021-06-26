import { combineReducers } from "redux";
import { dateReducer } from "./dateReducer";
import { databaseReducer } from "./databaseReducer";
import { newAppointmentReducer } from "./newAppointmentReducer";
import { optionsReducer } from "./optionsReducer";
import { menuReducer } from "./menuReducer";

export const reducer = combineReducers({
    date: dateReducer,
    database: databaseReducer,
    newAppointmentForm: newAppointmentReducer,
    options: optionsReducer,
    menu: menuReducer
});
