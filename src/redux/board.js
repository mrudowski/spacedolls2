import { createSlice, createSelector } from 'redux-starter-kit';
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
		toggleWall: (state, action) => {
			const tileId = action.payload;
			const tile = state.tiles[tileId];
			const tileDM = tileUtil.getDataModel(tile);
			if (tileDM.hasDoll()) {
				return;
			}
			// TODO the same function as in prepareData
			if (tileDM.hasWall()) {
				tile.wall = null;
			} else {
				tile.wall = boardUtil.createWall();
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

board.selectors = {
	// replacing board.selectors.getBoard,
	getSize,
	getTiles,
	getSelectedTileId,
	getSelectedTile,
};

export default board;
