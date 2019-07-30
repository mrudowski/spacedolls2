import { createSlice, createSelector } from 'redux-starter-kit';
import board from './board';
// import store from '../redux/store';

const actions = createSlice({
  slice: 'actions',
  initialState: {
    move: false,
    attack: false
  },
  reducers: {
    toggleMoveGizmo: state => {
      state.move = !state.move;
    },
    toggleAttackGizmo: state => {
      state.attack = !state.attack;
    },
 		// so close to tiles / board... maybe it should be the same reducer?
   //moveSelectedDollTo: (state, action) => {
      //const destinationTileId = action.payload;
      // can we???
     // NO!

     // You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.
		 // TODO: better overwrite combineReducers? and add third param?

     // thunk?
     // or https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers

     // as thunk!


      // state.selectedTileId = action.payload;
			// TODO: can we???
			// dispatch inside dispatch
			// board.actions.selectTile(destinationTileId);
    //}

		// moveSelectedDollTo: (state, action) => {
		// 	// better by selectors? if yes, then selector with board!
		// 	const sourceTile = state.tiles[state.selectedTileId];
		// 	const destinationTile = state.tiles[action.payload];
		// 	// change doll to dollId
		// 	destinationTile.doll = sourceTile.doll;
		// 	sourceTile.doll = null;
		// 	// state.selectedTileId = action.payload;
		// }
  }
});


// getState inside reducer...
// 1) by thunk?
// 2) or https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers

// 1)
// structure like? https://github.com/reduxjs/redux-starter-kit/issues/91

const moveSelectedDollTo = destinationTileId => {
	return (dispatch, getState) => {
		const completeState = getState();
		const sourceTile = board.selectors.getSelectedTile(completeState);

		dispatch(board.actions.changeDollPosition({sourceTileId: sourceTile.id, destinationTileId}));
	}
};

// effect?
actions.actions.moveSelectedDollTo = moveSelectedDollTo;

actions.selectors.isMoveGizmoActive = createSelector(['actions.move']);
actions.selectors.isAttackGizmoActive = createSelector(['actions.attack']);

export default actions;
