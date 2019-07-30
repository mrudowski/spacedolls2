import { createSlice, createSelector } from 'redux-starter-kit';
import * as boardUtil from '../utils/board';

const board = createSlice({
  slice: 'board',
  initialState: {
    tiles: {},
    selectedTileId: null
  },
  reducers: {
    setBoard: (state, action) => {
      // You can "mutate" the state in a reducer, thanks to Immer
      const levelId = action.payload;
      const tiles = boardUtil.prepareData(levelId);
      state.tiles = tiles;
    },
    // TODO: change SelectTile to SelectTileId?
    selectTile: (state, action) => {
      state.selectedTileId = action.payload;
    },
    toggleWall: state => {
      const tile = state.selectedTileId && state.tiles[state.selectedTileId];
      if (tile && tile.wall) {
        tile.wall = false;
      } else if (tile && !tile.doll) {
        tile.wall = true;
      }
    },
		changeDollPosition: (state, action) => {
      const {sourceTileId, destinationTileId} = action.payload;
			const sourceTile = state.tiles[sourceTileId];
			const destinationTile = state.tiles[destinationTileId];
      // thanks to immer
			// change doll to dollId
			destinationTile.doll = sourceTile.doll;
			sourceTile.doll = null;
			state.selectedTileId = destinationTile.id;
		}
  }
});

const { getBoard } = board.selectors;


board.selectors.getTiles = createSelector(['board.tiles']);
// board.selectors.getSelectedTileId = createSelector(['board.selectedTileId']);

// structure from?
// https://github.com/reduxjs/redux-starter-kit/issues/91

const getSelectedTile = createSelector(
  [getBoard],
  ({ tiles, selectedTileId }) => {
    if (selectedTileId) {
      return tiles[selectedTileId];
    } else {
      return null;
    }
  }
);
// TODO
board.selectors.getSelectedTile = getSelectedTile;

export default board;
