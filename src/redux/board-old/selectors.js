export const getBoardData = store => store.board.tiles;

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
// export const getTodos = store =>
//   getTodoList(store).map(id => getTodoById(store, id));
