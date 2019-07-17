import { combineReducers } from 'redux';
import counter from './reducers/counter';
import level from './level';
import board from './board';
import dolls from './dolls';

// rootReducer
export default combineReducers({
  counter,
  level: level.reducer,
  dolls: dolls.reducer,
  board: board.reducer
});

// export default (state = {}, action) => {
//   return {
//     counter: counter,
//     level: level.reducer,
//     dolls: dolls.reducer
//     board: board.reducer(state.board, action, state),
//   };
// };