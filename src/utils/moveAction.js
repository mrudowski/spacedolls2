import forEach from 'lodash/each';
import * as tileUtil from './tile';
import * as boardUtil from './board';
import * as dollUtil from './doll';
import * as pathFinderUtil from './pathFinder';

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
    console.log('Path was found', 'path length', path.length, path);
    // add all tiles from  path? and check if tile added
    const { x, y } = path[path.length - 1];
    const tileId = tileUtil.getIdFromXY(x, y);
    validTilesTest.push(tileId);
  } else {
    console.log('path no found!');
  }
};

//walkableArea /validTiles
export const getPossibleMoveTilesId = (startTileId, tiles) => {
  validTilesTest = [];

  moveRange = dollUtil.getDollMove(dollUtil.getSelectedDollId()) + 1;
  console.log('moveRange', moveRange);

  pathFinderUtil.prepareGrid(tiles);

  // we check all tiles on board - not best but easy
  // of course it would be better when counting from doll (and flood fill?)
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

      // optimise!
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
