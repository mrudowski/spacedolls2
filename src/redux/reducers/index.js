import { combineReducers } from 'redux';
import counter from './counter';
import level from './level';
import board from './board';

//rootReducer
export default combineReducers({
  counter,
  level,
  board
});
