import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducers/root.reducer";

const middleware = [thunk];

export const store = createStore(reducer, undefined, composeWithDevTools(applyMiddleware(...middleware)));
