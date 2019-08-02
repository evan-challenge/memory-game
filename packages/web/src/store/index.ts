import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import logger from 'redux-logger';

import loop from './reducers/loop.reducer';
import history from './reducers/history.reducer';
import { Actions } from './types';

const rootReducer = combineReducers({
  loop,
  history,
});

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, Actions>, logger),
);
