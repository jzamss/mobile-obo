import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import settingReducer from "./store/reducers/setting";

const rootReducers = combineReducers({
    auth: authReducer,
    setting: settingReducer,
})

export default createStore(rootReducers, applyMiddleware(ReduxThunk));