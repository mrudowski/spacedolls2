import { createSlice, createSelector } from 'redux-starter-kit';
import board from './board';

// TODO change to action

export const MOVE = 'MOVE';
export const ATTACK = 'ATTACK';

const actions = createSlice({
	slice: 'actions',
	initialState: {
		activeAction: null,
		hoveredTileId: null,
	},
	reducers: {
		toggleAction: (state, action) => {
			const actionName = action.payload;
			if (state.activeAction === actionName) {
				state.activeAction = null;
			} else {
				state.activeAction = actionName;
			}
		},
		setHoveredTileId: (state, action) => {
			state.hoveredTileId = action.payload;
		}
	}
});

// selectors

const getActiveAction = createSelector(['actions.activeAction']);
const getHoveredTileId = createSelector(['actions.hoveredTileId']);

actions.selectors = {
	getActiveAction,
	getHoveredTileId
};

// effects
// inspired by https://github.com/reduxjs/redux-starter-kit/issues/91

const moveSelectedDollTo = destinationTileId =>
	(dispatch, getState) => {
		const sourceTile = board.selectors.getSelectedTile(getState());
		dispatch(board.actions.changeDollPosition({
			sourceTileId: sourceTile.id,
			destinationTileId
		}));
	};


// for now only
const attack = tileId =>
	(dispatch, getState) => {
		console.log('TODO: ATTACK tile', tileId);
	};

actions.effects = {
	moveSelectedDollTo,
	attack,
};

export default actions;
