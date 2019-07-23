import { createSlice, createSelector } from 'redux-starter-kit';
import * as boardUtil from '../utils/board';

const board = createSlice({
  slice: 'board',
  initialState: {
    tiles: {},
    selectedTileId: null,
    move: false
  },
  reducers: {
    setBoard: (state, action) => {
      // You can "mutate" the state in a reducer, thanks to Immer
      const levelId = action.payload;
      const tiles = boardUtil.prepareData(levelId);
      state.tiles = tiles;
    },
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
    toggleMoveGizmo: state => {
      state.move = !state.move;
    },
    moveSelectedDollTo: (state, action) => {
      // better by selectors?
      const sourceTile = state.tiles[state.selectedTileId];
      const destinationTile = state.tiles[action.payload];
      // change doll to dollId
      destinationTile.doll = sourceTile.doll;
      sourceTile.doll = null;
      state.selectedTileId = action.payload;
    }
  }
});

const { getBoard } = board.selectors;

board.selectors.getTiles = createSelector(['board.tiles']);
// board.selectors.getSelectedTileId = createSelector(['board.selectedTileId']);

board.selectors.getSelectedTile = createSelector(
  [getBoard],
  ({ tiles, selectedTileId }) => {
    if (selectedTileId) {
      return tiles[selectedTileId];
    } else {
      return null;
    }
  }
);

// move to action

board.selectors.isMoveGizmoActive = createSelector(['board.move']);

export default board;
