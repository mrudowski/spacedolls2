import produce from 'immer';
import * as tileUtil from './tile';
import * as levelUtil from './level';

// manhattanDistance
// - linear movement
// - no diagonals
// - just cardinal directions (NSEW)

export const getDistance = (startTileId, endTileId) => {
  const { x: startX, y: startY } = tileUtil.getXYFromId(startTileId);
  const { x: endX, y: endY } = tileUtil.getXYFromId(endTileId);
  return Math.abs(startX - endX) + Math.abs(startY - endY);
};

export const prepareData = levelId => {
  console.log('prepareBoardData');

  const level = levelUtil.getLevel(levelId);
  const boardSize = level.size.width * level.size.height;

  const tiles = Array(boardSize)
    .fill()
    .reduce(function(map, currentValue, index) {
      const id = tileUtil.getTileIdFromIndex(index, level.size);
      map[id] = {
        id: id
      };
      return map;
    }, {});

  const updatedTiles = produce(tiles, draft => {
    level.walls.forEach(wall => {
      draft[wall.tile].wall = true;
    });
    level.dolls.forEach(doll => {
      draft[doll.tile].doll = doll.id;
    });
  });

  return updatedTiles;
};

// Map vs Object, mutation, spread, assign... with in depth discussion in comments section
// https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7
// https://stackoverflow.com/questions/26264956/convert-object-array-to-hash-map-indexed-by-an-attribute-value-of-the-object
// what about ImmutableJS (overkill?)
// and es6 Map?

// export const prepareBoardData = levelId => {

//   const level = levels[levelId];
//   const boardSize = level.size.width * level.size.height;

//   var tileMap = new Map(
//     Array(boardSize)
//       .fill()
//       .map((currentValue, index) => {
//         const id = getTileIdFromIndex(index, level.size);
//         return [
//           id,
//           {
//             id: id,
//             occupiedBy: []
//           }
//         ];
//       })
//   );

//   const tileCopy = tileMap;

//   level.walls.forEach((wall, index) => {
//     //tileMap.get(wall.tile).occupiedBy.push('wall');
//     const g = tileMap.get(wall.tile).occupiedBy;
//     tileMap.get(wall.tile).occupiedBy = [...g, 'wall'];
//   });

//   return tileMap;
// };
