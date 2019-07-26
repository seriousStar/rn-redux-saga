import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from './sagas';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    auth,
  });
  return configureStore(rootReducer, rootSaga);
};

export {
  AuthActions,
};
