import forEach from 'lodash/each';
import * as boardUtil from './board';
import * as dollUtil from './doll';
import * as tileUtil from './tile';

console.log('attackAction module');

// LOF - line of fire

// Previous WRONG approach:
// (moved to attackAction_bad.js as hard lesson)
// "For fun (and some optimization) we first calculate line to most distance tiles
// and - when valid - we merge all path as result tiles"

export const getRangeTilesIds = (tiles, startTile) => {
	const dollId = dollUtil.getDollFromTile(startTile);
	//for now - soon it will be weapon stats
  const range = dollUtil.getAttackRange(dollId);
  const affectWalls = dollUtil.getDollMetaData(dollId).stats.affectWalls;
	const overDoll = dollUtil.getDollMetaData(dollId).stats.aboveHeads;

  const isWallIncluded = tileId => {
  	const tileDM = tileUtil.getDataModel(tiles[tileId]);
		if (affectWalls) {
			return true;
		} else {
			return !tileDM.hasWall()
		}
	};

	const isCleanLOF = (startTileId, endTileId) => {
		const lineOfTilesIds = boardUtil.getTilesIdsOnLOF(startTileId, endTileId);

		return lineOfTilesIds.every((tileId, index) => {
			// without testing last tile because we want to hit it no matter what
			if (index === lineOfTilesIds.length - 1) {
				return true;
			}
			const tileDM = tileUtil.getDataModel(tiles[tileId]);
			return !(tileDM.hasWall() || (!overDoll && tileDM.hasDoll()));
		});
	};

	// TODO optimisation - use forEachTileInRange
	const tilesToCheck = [];
	forEach(tiles, (tile, tileId) => {
		if (
			tileId !== startTile.id &&
			isWallIncluded(tileId) &&
			boardUtil.getDistance(startTile.id, tileId) <= range
		) {
			tilesToCheck.push(tileId);
		}
	});

	return tilesToCheck.filter(tileId =>
		isCleanLOF(startTile.id, tileId));
};
