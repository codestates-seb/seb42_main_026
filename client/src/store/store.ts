import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import pageReducer from "./reducers/pageReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
