import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import logger from "redux-logger";

const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(logger, thunk)
);

store.subscribe(() => {
  saveState({
    token: store.getState().token
  });
});

export default store;
