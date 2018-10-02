import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger({
  predicate: (getState, action) => action.type && !action.type.includes('@@redux-form'),
});

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;