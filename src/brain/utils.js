import produce from 'immer';
import levels from '../data/levels';

export const getLevel = levelId => levels[levelId];
// export const getLevelName = levelId => getLevel(levelId).name;
// export const getBoardSize = levelId => getLevel(levelId).size;

export const getTileXFromId = id => id.split(',')[0];
export const getTileYFromId = id => id.split(',')[1];

export const getTileXFromIndex = (index, width) => index % width;
export const getTileYFromIndex = (index, height) => Math.floor(index / height);
// export const getTileIdFromXY = (x, y) => `${x},${y}`;
export const getTileIdFromIndex = (index, size) =>
  `${getTileXFromIndex(index, size.width)},${getTileYFromIndex(
    index,
    size.height
  )}`;

// export const prepareBoardData = levelId => {
//   console.log('prepareBoardData');

//   const level = levels[levelId];
//   const boardSize = level.size.width * level.size.height;

//   // Map vs Object, mutation, spread, assign... with in depth discussion in comments section
//   // https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7
//   // https://stackoverflow.com/questions/26264956/convert-object-array-to-hash-map-indexed-by-an-attribute-value-of-the-object
//   // what about ImmutableJS (overkill?)

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

export const prepareBoardData = levelId => {
  console.log('prepareBoardData');

  const level = levels[levelId];
  const boardSize = level.size.width * level.size.height;

  // Map vs Object, mutation, spread, assign... with in depth discussion in comments section
  // https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7
  // https://stackoverflow.com/questions/26264956/convert-object-array-to-hash-map-indexed-by-an-attribute-value-of-the-object
  // what about ImmutableJS (overkill?)

  const tiles = Array(boardSize)
    .fill()
    .reduce(function(map, currentValue, index) {
      const id = getTileIdFromIndex(index, level.size);
      map[id] = {
        id: id,
        occupiedBy: []
      };
      return map;
    }, {});

  const updatedTiles = produce(tiles, draft => {
    level.walls.forEach(wall => {
      draft[wall.tile].occupiedBy.push('wall');
    });
  });

  // level.walls.forEach((wall, index) => {
  //   const updatedTiles = produce(tiles, draft => {
  //     draft[wall.tile].occupiedBy.push('wall');
  //   })
  // });

  return updatedTiles;
};
