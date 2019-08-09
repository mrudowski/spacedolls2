import forEach from 'lodash/each';
import * as boardUtil from './board';
import * as dollUtil from './doll';
import * as tileUtil from './tile';

console.log('attackAction module');

// For fun (and some optimization) we calculate line to most distance tiles
// and - when valid - we merge all path as result tiles

export const getRangeTilesIds = (tiles, startTile) => {
	const rangeTilesId = [];
	const dollId = dollUtil.getDollFromTile(startTile);

	//for now - soon it will be weapon stats
  const range = dollUtil.getAttackRange(dollId);
  const affectWalls = dollUtil.getDollMetaData(dollId).stats.affectWalls;
	const overDoll = dollUtil.getDollMetaData(dollId).stats.aboveHeads;

  const isWallIncluded = tileId => {
  	//const tile = boardUtil.getTileById(tiles, tileId);
  	const tile = tileUtil.getModel(tiles, tileId);

		if (affectWalls) {
			return true;
		} else {
			return !tile.hasWall()
			//return !tileUtil.hasWall(tile)
		}
	};

	const getTilesIdsOnLOF = (startTileId, endTileId) => {
		// TODO change supercover_line to getLineOfTilesIds
		const lineOfTilesIds = boardUtil.supercover_line(startTileId, endTileId);

		const isCleanLine = lineOfTilesIds.every((tileId, index) => {

			// TODO outside?
			// without testing last tile because we want to hit it no matter what
			if (index === lineOfTilesIds.length - 1) {
				return true;
			}

			// TODO ????
			const tile = boardUtil.getTileById(tiles, tileId);
			// const tile = tiles[tileId];


			if (tileUtil.hasWall(tile)) {
				return false;
			}

			if (!overDoll && tileUtil.hasDoll(tile)) {
				return false;
			}

			//TODO isOccupied --- make a function?
			return !(tileUtil.hasWall(tile) || (!overDoll && tileUtil.hasDoll(tile)));
			//return !(tile.wall || (!aboveHeads && tile.doll));
		});

		return isCleanLine ? lineOfTilesIds : [];
	};

	let index = 0;
	let hardindex = 0;

	const distanceSortedArray = [];
	for (let i=0; i<=range; i++) {
		distanceSortedArray[i] = [];
	}

	// maybe better arrayWithIndex - by distance? wtf..

	forEach(tiles, (tile, tileId) => {
		index++;
		// TODO already optimised but not ducumented
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
