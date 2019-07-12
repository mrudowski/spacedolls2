import { CHANGE_LEVEL, SELECT_TILE } from '../actionTypes';
import produce from 'immer';

const initialState = {
  currentLevelId: null,
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
      case SELECT_TILE:
        draft.selectedTileId = action.payload.tileId;
        return;
      default:
        // immer doesn't need default but eslint does
        return;
    }
  });

export default level;
