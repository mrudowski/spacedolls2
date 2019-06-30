import { combineReducers } from 'redux';
import counter from './counter';
import level from './level';

//rootReducer
export default combineReducers({
  counter,
  level
});
