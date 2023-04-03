import { createStore, combineReducers } from 'redux';
import appReducer from './reducers/appReducer';
import authReducer from './reducers/authReducer';
import pageReducer from './reducers/editorReducer';
import modalReducer from './reducers/modalReducer';
import postDetailReducer from './reducers/postDetailReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
  post: postDetailReducer,
  isLoading: appReducer,
  isOpen: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
