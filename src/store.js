import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducers/rootReducer";
import thunk from "redux-thunk";

const middleware = [thunk];


export const store = createStore(
    reducer,
    undefined,
    applyMiddleware(...middleware)
);
