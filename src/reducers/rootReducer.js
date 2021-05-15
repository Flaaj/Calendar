import { combineReducers } from "redux";
import { dateReducer } from "./dateReducer";
import { databaseReducer } from "./databaseReducer";

export const reducer = combineReducers({
    date: dateReducer,
    database: databaseReducer,
})
