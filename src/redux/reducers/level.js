import {
  CHANGE_LEVEL,
  SET_BOARD,
  SELECT_TILE,
  TOGGLE_WALL
} from '../actionTypes';

const initialState = {
  currentLevelId: null,
  boardData: null,
  selectedTileId: null
};

export default function level(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LEVEL:
      return {
        ...state,
        currentLevelId: action.payload.levelId
      };
    case SET_BOARD:
      return {
        ...state,
        boardData: action.payload.boardData
      };
    case SELECT_TILE:
      return {
        ...state,
        selectedTileId: action.payload.tileId
      };
    case TOGGLE_WALL:
      return {
        ...state,
        boardData: action.payload.boardData
      };
    default:
      return state;
  }
}
