import produce from 'immer';
import forEach from 'lodash/each';
import * as tileUtil from './tile';
import * as levelUtil from './level';
import * as tilesDef from "./tileDef";

// things we could/should(?) get from store... (but how?)
// - tiles
// - boardSize

export const forEachTile = (tiles, callback) => {
	forEach(tiles, (tile, tileId) => {
		callback(tile, tileId)
	});
};


export const forEachTileInRange = (startTileId, range, boardSize, callback) => {
	const {x:startTileX, y:startTileY} = tileUtil.getXYFromId(startTileId);
	const {width, height} = boardSize;
	for (let x = Math.max(startTileX - range, 0); x <= Math.min(startTileX + range, width - 1); x++) {
		for (let y = Math.max(startTileY - range, 0); y <= Math.min(startTileY + range, height - 1); y++) {
			callback(x,y);
		}
	}
};

// manhattanDistance
// - linear movement
// - no diagonals
// - just cardinal directions (NSEW)

export const getDistance = (startTileId, endTileId) => {
  const { x: startX, y: startY } = tileUtil.getXYFromId(startTileId);
  const { x: endX, y: endY } = tileUtil.getXYFromId(endTileId);
  return Math.abs(startX - endX) + Math.abs(startY - endY);
};

// Supercover lines
// "lines that catch all the grid squares that a line passes through"
// https://www.redblobgames.com/grids/line-drawing.html#supercover
// better for what I want to archive here

// other interesting ones
// https://en.wikipedia.org/wiki/Xiaolin_Wu%27s_line_algorithm
// anti-aliasing might be useful for determining how much of an object is on one grid cell or another

export const getTilesIdsOnLOF = (startTileId, endTileId) => {
	const lineTiles = [];
	let { x: startX, y: startY } = tileUtil.getXYFromId(startTileId);
	let { x: endX, y: endY } = tileUtil.getXYFromId(endTileId);

	let dx = endX-startX, dy = endY-startY;
	let nx = Math.abs(dx), ny = Math.abs(dy);
	let sign_x = dx > 0 ? 1 : -1, sign_y = dy > 0 ? 1 : -1;

	for (let ix = 0, iy = 0; ix < nx || iy < ny;) {
		//if ((0.5+ix) / nx === (0.5+iy) / ny) {
		if ((1+2*ix) * ny === (1+2*iy) * nx) {
			// next step is diagonal
			startX += sign_x;
			startY += sign_y;
			ix++;
			iy++;
		//} else if ((0.5+ix) / nx < (0.5+iy) / ny) {
		} else if ((1+2*ix) * ny < (1+2*iy) * nx) {
			// next step is horizontal
			startX += sign_x;
			ix++;
		} else {
			// next step is vertical
			startY += sign_y;
			iy++;
		}
		lineTiles.push(tileUtil.getIdFromXY(startX, startY));
	}
	return lineTiles;
};


// Bresenham's line algorithm
// https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm

// no so good for us

export const getTilesIdsOnLOF_NOTUSED = (startTileId, endTileId) => {
  const lineTiles = [];
	let { x: startX, y: startY } = tileUtil.getXYFromId(startTileId);
	let { x: endX, y: endY } = tileUtil.getXYFromId(endTileId);

  let dx = Math.abs(endX - startX),
      dy = Math.abs(endY - startY),
	    sx = startX < endX ? 1 : -1,
	    sy = startY < endY ? 1 : -1,
      err = (dx>dy ? dx : -dy)/2;
    	//err = dx + dy;

  while (true) {
    if (startX === endX && startY === endY) break;
    let e2 = err;
		// let e2 = 2 * err;
    if (e2 > -dx) { // e2 >= dy
      err -= dy; // +=
      startX += sx;
    }
    if (e2 < dy) { // e2 <= dx
      err += dx; //
      startY += sy;
    }

		lineTiles.push(tileUtil.getIdFromXY(startX, startY));
	}

  return lineTiles;
};

export const createWall = () => tilesDef.getInitialStats(tilesDef.WALL);

export const prepareData = levelId => {
  console.log('prepareBoardData');

  const level = levelUtil.getLevel(levelId);
  const { width, height } = level.size;
  const boardSize = width * height;

  const tiles = Array(boardSize)
    .fill()
    .reduce(function(map, currentValue, index) {
      const id = tileUtil.getIdFromIndex(index, level.size);
      map[id] = {
        id: id
      };
      return map;
    }, {});

	// we don't needed immer here...
  const updatedTiles = produce(tiles, draft => {
    level.walls.forEach(wall => {
      draft[wall.tile].wall = createWall();
    });
    level.dolls.forEach(doll => {
      draft[doll.tile].dollId = doll.id;
    });
  });

  return [ updatedTiles, width, height];
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
