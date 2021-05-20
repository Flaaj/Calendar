import { combineReducers } from "redux";
import { dateReducer } from "./dateReducer";
import { databaseReducer } from "./databaseReducer";
import { newAppointmentReducer } from "./newAppointmentReducer";

export const reducer = combineReducers({
    date: dateReducer,
    database: databaseReducer,
    newAppointmentForm: newAppointmentReducer
});
