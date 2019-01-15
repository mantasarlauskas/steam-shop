import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import {loadState, saveState} from './localStorage';
import multi from 'redux-multi'

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk, multi));

store.subscribe(() => {
  saveState({
    token: store.getState().token,
  });
});

export default store;