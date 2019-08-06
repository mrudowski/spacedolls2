import forEach from 'lodash/each';
import * as boardUtil from './board';
import * as dollUtil from './doll';

console.log('attackAction module');

export const getRangeTilesIds = (tiles, startTile) => {
	const rangeTilesId = [];
	const dollId = dollUtil.getDollFromTile(startTile);
	// weapon stats
  const range = dollUtil.getAttackRange(dollId);
  const affectWalls = dollUtil.getDollMetaData(dollId).stats.affectWalls;
	const aboveHeads = dollUtil.getDollMetaData(dollId).stats.aboveHeads;

	// inner function better then outside with 2nd attr tiles?
  const isWallIncluded = tileId => {
		const tile = tiles[tileId];
		//TODO make a function for tile.wall?
		if (affectWalls) {
			return true;
		} else {
			return !tile.wall
		}
	}

	const getTilesIdsOnLOF = (startTileId, endTileId) => {
		const lineOfTilesIds = boardUtil.supercover_line(startTileId, endTileId);

		// MERGE IT

		// const targetTileId = lineOfTilesIds.pop();

		const isCleanLine = lineOfTilesIds.every((tileId, index) => {
			// TODO make util for that:
			const tile = tiles[tileId];

			// without testing last tile because we want to hit at it
			if (index === lineOfTilesIds.length - 1) {
				return true;
			}

			//TODO isOccupied --- make a function?
			// what about aboveHead
			return !(tile.wall || (!aboveHeads && tile.doll));
		});

		return isCleanLine ? lineOfTilesIds : [];
	};

	const isOnLOS = (startTileId, endTileId) => {
		const lineOfTilesIds = boardUtil.supercover_line(startTileId, endTileId);

		// MERGE IT

		// const targetTileId = lineOfTilesIds.pop();

		return lineOfTilesIds.every((tileId, index) => {
			// TODO make util for that:
			const tile = tiles[tileId];

			// without testing last tile because we want to hit at it
			if (index === lineOfTilesIds.length - 1) {
				return true;
			}

			//TODO isOccupied --- make a function?
			// what about aboveHead
			return !(tile.wall || (!aboveHeads && tile.doll));
		});
	};

	let index = 0;
	let hardindex = 0;

	const distanceSortedArray = [];
	for (let i=0; i<=range; i++) {
		distanceSortedArray[i] = [];
	}

	// meybe better arrayWithIndex - by distance? wtf..

	forEach(tiles, (tile, tileId) => {
		index++;
		// TODO optimise!
		// we should to calculate it from max distance to low distance!!!
		// without it is no so optimise at all

		// and add whole lines not single (end) tiles!
		// or better Dijkstra’s Algorithm?
		// https://www.redblobgames.com/pathfinding/a-star/introduction.html
		if (
			tileId !== startTile.id &&
			boardUtil.getDistance(startTile.id, tileId) <= range &&
			isWallIncluded(tileId)
		) {
			const distance = boardUtil.getDistance(startTile.id, tileId);
			distanceSortedArray[distance].push(tileId);
		}
	});

	distanceSortedArray.flat().reverse().forEach(tileId => {
		if (!rangeTilesId.includes(tileId)) {
			// console.log('process', tileId);
			hardindex++;
			const tilesIdsOnLOF = getTilesIdsOnLOF(startTile.id, tileId);
			rangeTilesId.push(...tilesIdsOnLOF);
			// it return tiledId we already had in array...
			//console.log('tilesIdsOnLOF',tilesIdsOnLOF, tileId, rangeTilesId.includes(tileId));
		} else {
			// console.log('ommit', tileId);
		}
	});

	console.log('number of itteration',index, hardindex);

	// we check all tiles on board - not best but easy
  // of course it would be better when counting from doll (and flood fill?)

	const uniqueRangeTilesId = [...new Set(rangeTilesId)]

  // forEach(tiles, (tile, tileId) => {
		// // TODO optimise!
		// // and add whole lines not single (end) tiles!
		// // or better Dijkstra’s Algorithm?
		// // https://www.redblobgames.com/pathfinding/a-star/introduction.html
  //   if (
  //     tileId !== startTile.id &&
		// 	boardUtil.getDistance(startTile.id, tileId) <= range &&
		// 	isWallIncluded(tileId) &&
		// 	isOnLOS(startTile.id, tileId)
  //   ) {
		// 	rangeTilesId.push(tileId);
  //   }
  // });
  return uniqueRangeTilesId;//uniqueRangeTilesId;
};
