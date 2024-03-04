import { combineReducers } from "redux";
import accountReducer from "./account";
import pathReducer from "./path";

const rootReducer = combineReducers({
    account: accountReducer,
    path: pathReducer
})

export default rootReducer