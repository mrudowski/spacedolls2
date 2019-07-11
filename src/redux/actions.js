import { CHANGE_LEVEL, SET_BOARD, SELECT_TILE, TOGGLE_WALL } from './actionTypes';

export const changeLevel = levelId => ({
  type: CHANGE_LEVEL,
  payload: {
    levelId
  }
});

export const setBoard = levelId => ({
  type: SET_BOARD,
  payload: {
    levelId
  }
});

export const selectTile = tileId => ({
  type: SELECT_TILE,
  payload: {
    tileId
  }
});

export const toggleWall = tileId => ({
  type: TOGGLE_WALL,
  payload: {
    tileId
  }
});
