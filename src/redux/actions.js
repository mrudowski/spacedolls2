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
const attack = (targetTileId, FOD) =>
	(dispatch, getState) => {
		const tiles = board.selectors.getTiles(getState());
		// if tileId empty then nothing?
		// if tilesId wall or doll then attack?

		// TODO move calcDemage to other function?

		const boardSize = board.selectors.getSize(getState());
		const FODTilesIds = [];
		// TODO get forEachTileInRangeGetId // getXY
		boardUtil.forEachTileInRange(targetTileId, FOD - 1, boardSize, (x, y) => {
			const tileId = tileUtil.getIdFromXY(x, y);
			const distance = boardUtil.getDistance(targetTileId, tileId);
			const damage = 1 / (distance + 1);
			FODTilesIds.push({tileId, damage});
		});
		console.log('FOD', FODTilesIds);
		FODTilesIds.forEach(value => {
			const tileDM = tileUtil.getDataModel(tiles[value.tileId]);
			if (tileDM.hasDoll()) {
				const dollId = tileDM.getDollId();
				const dollsById = dolls.selectors.getDolls(getState());
				console.log('DOLL ATTACKED', dollsById[dollId], value.damage);
			}
			if (tileDM.hasWall()) {
				const wall = tileDM.getWall();
				console.log('WALL ATTACKED', wall, value.damage);
			}

		});


	};

actions.effects = {
	moveSelectedDollTo,
	attack,
};

export default actions;
