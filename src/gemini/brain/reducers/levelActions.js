export const CHANGE_LEVEL = 'CHANGE_LEVEL';
export const SET_BOARD = 'SET_BOARD';
export const SELECT_TILE = 'SELECT_TILE';

export const changeLevel = levelId => ({
  type: CHANGE_LEVEL,
  payload: {
    levelId
  }
});

export const setBoard = boardData => ({
  type: SET_BOARD,
  payload: {
    boardData
  }
});

export const selectTile = tileId => ({
  type: SELECT_TILE,
  payload: {
    tileId
  }
});
