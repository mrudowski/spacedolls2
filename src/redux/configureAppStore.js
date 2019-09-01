import { configureStore } from 'redux-starter-kit';
import throttle from 'lodash/throttle';
// import { createStore } from 'redux'
import reducer from './rootReducer';
import {loadState, saveState} from './localStorage';


const configureAppStore = () => {
  const preloadedState = loadState();

  // const store = createStore(reducer);
  const store = configureStore({
    reducer,
    preloadedState
  });

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 500));

  return store;
};

export default configureAppStore;
