export const getBoardData = store => store.board.tiles;

// not used // as example only
export const getSelectedDollData = store => {
  const selectedTileId = store.level.selectedTileId;
  const dolls = store.dolls.byId;
  //const board = getBoardData(store);
  const board = store.board.tiles;
  if (board && board[selectedTileId] && board[selectedTileId].doll) {
    return dolls[board[selectedTileId].doll];
  } else {
    return null;
  }
};


/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
// export const getTodos = store =>
//   getTodoList(store).map(id => getTodoById(store, id));
