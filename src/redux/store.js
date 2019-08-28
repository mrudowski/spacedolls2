import { configureStore } from 'redux-starter-kit';
// import { createStore } from 'redux'
import reducer from './rootReducer';
import {loadState, saveState} from "./localStorage";

const preloadedState = loadState();

// const store = createStore(reducer);
const store = configureStore({
  reducer,
  preloadedState
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
