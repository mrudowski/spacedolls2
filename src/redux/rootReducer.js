import { combineReducers } from 'redux';
import counter from './reducers/counter';
import level from './level';
import board from './board';
import dolls from './dolls';
import actions from './actions';

export default combineReducers({
  counter,
  level: level.reducer,
  dolls: dolls.reducer,
  board: board.reducer,
  actions: actions.reducer
});

/*
https://redux.js.org/faq/reducers#reducers-share-state

Many users later want to try to share data between two reducers,
but find that combineReducers does not allow them to do so.
There are several approaches that can be used:

- If a reducer needs to know data from another slice of state,
  the state tree shape may need to be reorganized so that a single
  reducer is handling more of the data.
- You may need to write some custom functions for handling
  some of these actions. This may require replacing combineReducers
  with your own top-level reducer function. You can also use
  a utility such as reduce-reducers to run combineReducers to
  handle most actions, but also run a more specialized reducer
  for specific actions that cross state slices.
- Async action creators such as redux-thunk have access to the
  entire state through getState(). An action creator can retrieve
  additional data from the state and put it in an action,
  so that each reducer has enough information to update
  its own state slice.

Other read:
https://invalidpatent.wordpress.com/2016/02/18/sharing-state-between-redux-reducers/
https://github.com/markerikson/redux/blob/create-faq-page/docs/FAQ.md#how-do-i-share-state-between-two-reducers-do-i-have-to-use-combinereducers
https://stackoverflow.com/questions/35667249/accessing-redux-state-in-an-action-creator
https://github.com/reduxjs/redux/issues/601
*/

/*
However you can see that it relies on store being a singleton exported
from some module. We don’t recommend that because it makes it much
harder to add server rendering to your app because in most cases
on the server you’ll want to have a separate store per request.
So while technically this approach works, we don’t recommend
exporting a store from a module.
- Dan Abramov & Mark Erikson

Most of the time, if you're using a selector in an action creator,
you're doing it inside of a thunk. Thunks have access to getState,
so the entire state tree is accessible
- Mark Erikson
*/

// export default (state = {}, action) => {
//   return {
//     counter: counter,
//     level: level.reducer,
//     dolls: dolls.reducer
//     board: board.reducer(state.board, action, state),
//   };
// };
