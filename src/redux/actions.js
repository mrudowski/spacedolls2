import { createSlice, createSelector } from 'redux-starter-kit';
import board from './board';

// TODO change to action

export const MOVE = 'MOVE';
export const ATTACK = 'ATTACK';

const actions = createSlice({
  slice: 'actions',
  initialState: {
    activeAction: null,
		FODTileId: null
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
		toggleFOD: (state, action) => {
			const {targetTileId} = action.payload;
			state.FODTileId = targetTileId;
		}
	}
});

// selectors

const getActiveAction = createSelector(['actions.activeAction']);
const getFODTileId = createSelector(['actions.FODTileId']);

actions.selectors = {
	getActiveAction,
	getFODTileId
};

// effects
// inspired by https://github.com/reduxjs/redux-starter-kit/issues/91

const moveSelectedDollTo = destinationTileId => {
	return (dispatch, getState) => {
		const sourceTile = board.selectors.getSelectedTile(getState());
		dispatch(board.actions.changeDollPosition({sourceTileId: sourceTile.id, destinationTileId}));
	}
};

const attack = tileId => {
	return (dispatch, getState) => {
		console.log("ATTACK tile", tileId);
		dispatch(actions.actions.toggleFOD({targetTileId: tileId}));
	}
};

actions.effects = {
	moveSelectedDollTo,
	attack,
};

export default actions;
