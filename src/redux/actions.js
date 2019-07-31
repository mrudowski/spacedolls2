import { createSlice, createSelector } from 'redux-starter-kit';
import board from './board';

const actions = createSlice({
  slice: 'actions',
  initialState: {
    moveActive: false,
    attackActive: false
  },
  reducers: {
    toggleMoveAction: state => {
      state.moveActive = !state.moveActive;
    },
    toggleAttackAction: state => {
      state.attackActive = !state.attackActive;
    },
  }
});

// selectors

const isMoveActionActive = createSelector(['actions.moveActive']);
const isAttackActionActive = createSelector(['actions.attackActive']);


actions.selectors = {
	...actions.selectors,
	isMoveActionActive,
	isAttackActionActive,
};

// effects
// inspired by https://github.com/reduxjs/redux-starter-kit/issues/91

const moveSelectedDollTo = destinationTileId => {
	return (dispatch, getState) => {
		const sourceTile = board.selectors.getSelectedTile(getState());
		dispatch(board.actions.changeDollPosition({sourceTileId: sourceTile.id, destinationTileId}));
	}
};

actions.effects = {
	moveSelectedDollTo,
};

export default actions;
