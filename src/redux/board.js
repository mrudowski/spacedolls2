import { createSlice, createSelector } from 'redux-starter-kit';
import { prepareBoardData } from '../utils/tile';

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
      const tiles = prepareBoardData(levelId);
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
    }
  }
});

const { getBoard } = board.selectors;

board.selectors.getTiles = createSelector(['board.tiles']);
board.selectors.selectedTileId = createSelector(['board.selectedTileId']);

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

board.selectors.isMoveGizmoActive = createSelector(['board.move']);

export default board;
