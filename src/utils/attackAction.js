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

	// inside better then outside with 2nd attr tiles
  const isWallIncluded = tileId => {
		const tile = tiles[tileId];
		//TODO make a function for tile.wall?
		console.log('isWallIncluded',!!tile.wall, affectWalls, !!tile.wall && !affectWalls);
		if (affectWalls) {
			return true;
		} else {
			return !tile.wall
		}
	}

  // inside better then outside with 3rd attr tiles
	const isOnLOS = (startTileId, endTileId) => {
		const lineOfTilesIds = boardUtil.supercover_line(startTileId, endTileId);

		// MERGE IT

		// const targetTileId = lineOfTilesIds.pop();

		return lineOfTilesIds.every((tileId, index) => {
			// TODO make util for that:
			const tile = tiles[tileId];
			console.log('index',index);

			// without testing last tile because we want to hit at it
			if (index === lineOfTilesIds.length - 1) {
				return true;
			}

			//TODO isOccupied --- make a function?
			// what about aboveHead
			return !(tile.wall || (!aboveHeads && tile.doll));
		});
	};

  // we check all tiles on board - not best but easy
  // of course it would be better when counting from doll (and flood fill?)
  forEach(tiles, (tile, tileId) => {
		// TODO optimise!
		// and add whole lines not single (end) tiles!
    if (
      tileId !== startTile.id &&
			boardUtil.getDistance(startTile.id, tileId) <= range &&
			isWallIncluded(tileId) &&
			isOnLOS(startTile.id, tileId)
    ) {
			rangeTilesId.push(tileId);
    }
  });
  return rangeTilesId;
};
