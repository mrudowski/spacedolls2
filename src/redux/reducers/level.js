import {
  CHANGE_LEVEL,
  SET_BOARD,
  SELECT_TILE,
  TOGGLE_WALL
} from '../actionTypes';
import { prepareBoardData } from '../../brain/utils';
import produce from 'immer';

const initialState = {
  currentLevelId: null,
  boardData: null,
  selectedTileId: null
};

// with immer
// but while we using redux-starter-kit it could be even simpler
// https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#simplifying-immutable-updates-with-redux-starter-kit

const level = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LEVEL:
        draft.currentLevelId = action.payload.levelId;
        return;
      case SET_BOARD:
        const boardData = prepareBoardData(action.payload.levelId);
        console.log('boardData', boardData);
        return {
          ...state,
          boardData: boardData
        };
      case SELECT_TILE:
        draft.selectedTileId = action.payload.tileId;
        return;
      case TOGGLE_WALL:
        const tileId = action.payload.tileId;
        if (draft.boardData[tileId].occupiedBy.length === 0) {
          draft.boardData[tileId].occupiedBy.push({
            type: 'wall'
          });
        }
        return;
      default:
        // immer doesn't need default but eslint does
        return;
    }
  });

export default level;
