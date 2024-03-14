import { combineReducers } from "redux";
import accountReducer from "./account";
import bannerReducer from "./banner";
import pathReducer from "./path";

const rootReducer = combineReducers({
    account: accountReducer,
    path: pathReducer,
    banner: bannerReducer
})

export default rootReducer