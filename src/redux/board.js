import { createSlice, createSelector } from 'redux-starter-kit';
import dolls from './dolls';
import * as boardUtil from '../utils/board';
import * as tileUtil from '../utils/tile';

const board = createSlice({
	slice: 'board',
	initialState: {
		width: 0,
		height: 0,
		tiles: {},
		selectedTileId: null
	},
	reducers: {
		setBoard: (state, action) => {
			// You can "mutate" the state in a reducer, thanks to Immer
			const levelId = action.payload;
			const [ tiles, width, height ] = boardUtil.prepareData(levelId);
			state.tiles = tiles;
			state.width = width;
			state.height = height;
		},
		// TODO: change SelectTile to SelectTileId?
		selectTile: (state, action) => {
			state.selectedTileId = action.payload;
		},
		changeDollPosition: (state, action) => {
			const {sourceTileId, destinationTileId} = action.payload;
			const sourceTile = state.tiles[sourceTileId];
			const destinationTile = state.tiles[destinationTileId];
			// thanks to immer
			destinationTile.dollId = sourceTile.dollId;
			sourceTile.dollId = null;
			state.selectedTileId = destinationTile.id;
		},
		removeDoll: (state, action) => {
			const tileId = action.payload;
			const tile = state.tiles[tileId];
			// by utils too?
			tile.dollId = null;

			// TODO we should removed it (mark as KIA) from other place too like characters roster etc
		},
		dealDamageToWall: (state, action) => {
			const {
				tileId,
				attackStrength,
			} = action.payload;
			const tile = state.tiles[tileId];
			const tileDM = tileUtil.getDataModel(tile);
			const wall = tileDM.getWall();
			const result  = wall.hp - attackStrength;
			if (result > 0) {
				wall.hp = result; // immer
			} else {
				tileDM.destroyWall();
			}
		},
		toggleWall: (state, action) => {
			const tileId = action.payload;
			const tile = state.tiles[tileId];
			const tileDM = tileUtil.getDataModel(tile);
			if (tileDM.hasDoll()) {
				return;
			}
			if (tileDM.hasWall()) {
				tileDM.destroyWall();
			} else {
				tileDM.createWall();
			}
		},
	}
});

// selectors

const getSize = createSelector(
	['board.width', 'board.height'],
	(width, height) => (
		{width, height}
	)
);
const getTiles = createSelector(['board.tiles']);
const getSelectedTileId = createSelector(['board.selectedTileId']);

const getSelectedTile = createSelector(
	[getTiles, getSelectedTileId],
	(tiles, selectedTileId) => {
		if (selectedTileId) {
			return tiles[selectedTileId];
		}
		return null;
	}
);

const getTileDMById = tileId =>
	createSelector(
	[getTiles],
		tiles => tileUtil.getDataModel(tiles[tileId])
	);

board.selectors = {
	// replacing board.selectors.getBoard,
	getSize,
	getTiles,
	getSelectedTileId,
	getSelectedTile,
	getTileDMById,
};


// effects

const dealDamageToTile = ({tileId, attackStrength}) =>
	(dispatch, getState) => {
		const tileDM = board.selectors.getTileDMById(tileId)(getState());

		if (tileDM.hasWall()) {
			dispatch(board.actions.dealDamageToWall({
				tileId,
				attackStrength
			}));
		}

		if (tileDM.hasDoll()) {
			const dollId = tileDM.getDollId();
			dispatch(dolls.effects.dealDamageToDoll({
				tileId,
				dollId,
				attackStrength
			}));
		}
	};

board.effects = {
	dealDamageToTile,
};

export default board;
