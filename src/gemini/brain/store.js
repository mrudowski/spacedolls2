import { configureStore } from 'redux-starter-kit';
// import { createStore } from 'redux'
import reducer from './reducers/index';

// const store = createStore(reducer);

const store = configureStore({
  reducer
});

export default store;
