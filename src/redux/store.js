import { configureStore } from 'redux-starter-kit';
// import { createStore } from 'redux'
import reducer from './rootReducer';

// const store = createStore(reducer);

const store = configureStore({
  reducer
});

export default store;
