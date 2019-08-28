import { SET_BOARD, TOGGLE_WALL } from './actionTypes';
import { prepareBoardData } from '../../brain/utils';
import produce from 'immer';

const initialState = {
  tiles: {}
};

// with immer
// but while we using redux-starter-kit it could be even simpler
// https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-starter-kit

const board = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BOARD:
        const tiles = prepareBoardData(action.payload.levelId);
        console.log('tiles', tiles);
        draft.tileset = tiles;
        return;
      case TOGGLE_WALL:
        // TODO utils
        const tileId = action.payload.tileId;
        if (draft.tiles[tileId].wall) {
          draft.tiles[tileId].wall = false;
        } else if (!draft.tiles[tileId].dollId) {
          draft.tiles[tileId].wall = true;
        }
        return;
      default:
        // immer doesn't need default but eslint does
        return;
    }
  });

export default board;
