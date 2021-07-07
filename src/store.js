import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducers/root.reducer";
import thunk from "redux-thunk";
import DevTools from "./DevTools";

const middleware = [thunk];

const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(...middleware),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
);

export const store = createStore(reducer, undefined, enhancer);
