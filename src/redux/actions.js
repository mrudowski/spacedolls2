import { SET_BOARD, TOGGLE_WALL } from './actionTypes';

export const setBoard = levelId => ({
  type: SET_BOARD,
  payload: {
    levelId
  }
});

export const toggleWall = tileId => ({
  type: TOGGLE_WALL,
  payload: {
    tileId
  }
});
