import { combineReducers } from 'redux';
import counter from './counter';
import level from './level';
import board from './board';
import dolls from './dolls';

//rootReducer
export default combineReducers({
  counter,
  level: level.reducer,
  dolls: dolls.reducer,
  board
});
