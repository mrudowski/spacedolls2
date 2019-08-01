import { createSlice, createSelector } from 'redux-starter-kit';
import board from './board';

// TODO change to action

export const MOVE = 'MOVE';
export const ATTACK = 'ATTACK';

const actions = createSlice({
  slice: 'actions',
  initialState: {
    activeAction: null,
  },
  reducers: {
    toggleMoveAction: state => {
    	if (state.activeAction === MOVE) {
				state.activeAction = null;
			} else {
				state.activeAction = MOVE;
			}
    },
    toggleAttackAction: state => {
			if (state.activeAction === ATTACK) {
				state.activeAction = null;
			} else {
				state.activeAction = ATTACK;
			}
    },
  }
});

// selectors

const getActiveAction = createSelector(['actions.activeAction']);

actions.selectors = {
	getActiveAction,
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
