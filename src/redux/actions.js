import { createSlice, createSelector } from 'redux-starter-kit';
import board from './board';
import dolls from './dolls';
import * as tileUtil from '../utils/tile';
import * as boardUtil from '../utils/board';

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
		},
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

const attack = (targetTileId, FOD) =>
	(dispatch, getState) => {
		// TODO if tileId empty then nothing?
		// const tiles = board.selectors.getTiles(getState());
		// if tilesId wall or doll then attack?
		const boardSize = board.selectors.getSize(getState());
		const selectedDollDM = dolls.selectors.getSelectedDollDM(getState());

		// TODO some place to optimisation because we calculate it again here...
		const damageMap = [];
		boardUtil.forEachTileInRange(targetTileId, FOD - 1, boardSize, (x, y) => {
			const tileId = tileUtil.getIdFromXY(x, y);
			const distance = boardUtil.getDistance(targetTileId, tileId) - 1;
			damageMap.push({tileId, distance});
		});

		damageMap.forEach(({tileId, distance}) => {
			dispatch(board.effects.dealDamageToTile({
				tileId,
				attackStrength: (selectedDollDM.getAttackStrength() - distance)
			}));
		});
	};

actions.effects = {
	moveSelectedDollTo,
	attack,
};

export default actions;
