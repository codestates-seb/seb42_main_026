import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import pageReducer from './reducers/editorReducer';
import postDetailReducer from './reducers/postDetailReducer';
import userInfoReducer from './reducers/userInfoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
  post: postDetailReducer,
  user: userInfoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
