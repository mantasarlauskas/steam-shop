import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {loadState, saveState} from './localStorage';
import multi from 'redux-multi'

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, applyMiddleware(createLogger(), thunk, multi));

store.subscribe(() => {
  saveState({
    token: store.getState().token,
  });
});

export default store;