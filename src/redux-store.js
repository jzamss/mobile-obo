import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import settingReducer from "./store/reducers/setting";
import oboReducer from "./store/reducers/obo";

const rootReducers = combineReducers({
    auth: authReducer,
    setting: settingReducer,
    obo: oboReducer,
})

export default createStore(rootReducers, applyMiddleware(ReduxThunk));