import forEach from 'lodash/each';
import * as tileUtil from './tile';
import * as boardUtil from './board';
import * as dollUtil from './doll';
import * as pathFinderUtil from './pathFinder';

console.log('moveAction module');
// change name
// change to const?
let validTilesTest = [];
let moveRange = 0;

// by easystar `enableSync` we change asynchronous function to synchronous
// but we still have to deal with callback in some way
const addTileToValidTiles = path => {
  // static 4 for now
  // we should get it from the selected doll stats/ap

  if (path && path.length > 0 && path.length <= moveRange) {
    // add all tiles from  path? and check if tile added
    const { x, y } = path[path.length - 1];
    const tileId = tileUtil.getIdFromXY(x, y);
    validTilesTest.push(tileId);
  }
};

//walkableArea /validTiles
export const getPossibleMoveTilesId = (startTileId, tiles, dollId, boardSize) => {
  validTilesTest = [];

  moveRange = dollUtil.getDollMove(dollId) + 1;

  pathFinderUtil.prepareGrid(tiles, boardSize);

  // we check all tiles on board - not best but easy
  // of course it would be better when counting from doll
  // Breadth First Search (flood fill)
	// or even better Dijkstra’s Algorithm(?)

	// if you need varying movement costs, Breadth First Search becomes Dijkstra’s Algorithm.
  // if you add a way to guide the search towards the goal, Breath First Search becomes Best First Search.
  // If you start with Breadth First Search and add early exit, weighted edges, and a heuristic, you get A*.

  // source: https://www.redblobgames.com/pathfinding/tower-defense/
	// https://www.redblobgames.com/pathfinding/a-star/introduction.html
  // and https://github.com/bah87/maze-runner

  forEach(tiles, (tile, tileId) => {
    //distance bigger or not
    // TODO isWalkable to the utils

    if (
      !tile.wall &&
      !tile.doll &&
      boardUtil.getDistance(startTileId, tileId) <= moveRange
    ) {
      const { x: startX, y: startY } = tileUtil.getXYFromId(startTileId);
      const { x: endX, y: endY } = tileUtil.getXYFromId(tileId);

      // TODO optimise!
      // and check if tile already added

			pathFinderUtil.calculatePath(
        startX,
        startY,
        endX,
        endY,
        addTileToValidTiles
      );
    }
  });
  return validTilesTest;
};
