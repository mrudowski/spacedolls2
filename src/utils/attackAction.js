import forEach from 'lodash/each';
import * as boardUtil from './board';
import * as dollUtil from './doll';
import * as tileUtil from './tile';

console.log('attackAction module');

// For fun (and some optimization) we first calculate line to most distance tiles
// and - when valid - we merge all path as result tiles

export const getRangeTilesIds = (tiles, startTile) => {
	const dollId = dollUtil.getDollFromTile(startTile);
	//for now - soon it will be weapon stats
  const range = dollUtil.getAttackRange(dollId);
  const affectWalls = dollUtil.getDollMetaData(dollId).stats.affectWalls;
	const overDoll = dollUtil.getDollMetaData(dollId).stats.aboveHeads;

  const isWallIncluded = tileId => {
  	//const tile = boardUtil.getTileById(tiles, tileId);
  	const tileDM = tileUtil.getDataModel(tiles[tileId]);

		if (affectWalls) {
			return true;
		} else {
			return !tileDM.hasWall()
			//return !tileUtil.hasWall(tile)
		}
	};

	const getTilesIdsOnLOF = (startTileId, endTileId) => {
		const lineOfTilesIds = boardUtil.getTilesIdsOnLOF(startTileId, endTileId);

		const isCleanLine = lineOfTilesIds.every((tileId, index) => {
			// without testing last tile because we want to hit it no matter what
			if (index === lineOfTilesIds.length - 1) {
				return true;
			}
			const tileDM = tileUtil.getDataModel(tiles[tileId]);
			return !(tileDM.hasWall() || (!overDoll && tileDM.hasDoll()));
		});

		return isCleanLine ? lineOfTilesIds : [];
	};

	// calculate line from max distance to low distance
	// without it is not not optimise at all
	const distanceSortedArray = Array(range+1).fill([]);
	forEach(tiles, (tile, tileId) => {
		if (
			tileId !== startTile.id &&
			isWallIncluded(tileId)
		) {
			const distance = boardUtil.getDistance(startTile.id, tileId);
			if (distance <= range) {
				distanceSortedArray[distance].push(tileId);
			}
		}
	});

	const rangeTilesIds = [];
	distanceSortedArray.flat().reverse().forEach(tileId => {
		if (!rangeTilesIds.includes(tileId)) {
			const tilesIdsOnLOF = getTilesIdsOnLOF(startTile.id, tileId);
			// we add whole lines not single (end) tiles
			// it can returns tiledId we already had in array...
			rangeTilesIds.push(...tilesIdsOnLOF);
		}
	});

	// ... that why we need unique set of it
	const uniqueRangeTilesIds = [...new Set(rangeTilesIds)];
  return uniqueRangeTilesIds;
};
