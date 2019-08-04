import forEach from 'lodash/each';
import * as boardUtil from './board';
import * as dollUtil from './doll';

console.log('attackAction module');

export const getRangeTilesIds = (tiles, startTile) => {
	const rangeTilesId = [];
	const dollId = dollUtil.getDollFromTile(startTile);
  const range = dollUtil.getAttackRange(dollId);

  // inside better then outside with params?
	const isOnLOS = (startTileId, endTileId) => {
		const lineOfTilesIds = boardUtil.supercover_line(startTileId, endTileId);

		// without testing last tile because we want to hit at it
		lineOfTilesIds.pop();

		const result = lineOfTilesIds.every(tileId => {
			//TODO make util for that:
			const tile = tiles[tileId];

			//TODO isOccupied --- make a function
			return !(tile.wall || tile.doll);
		});
		return result;

	};

  // we check all tiles on board - not best but easy
  // of course it would be better when counting from doll (and flood fill?)
  forEach(tiles, (tile, tileId) => {
		// TODO optimise!
		// and add whole lines not single (end) tiles!
    if (
      tileId !== startTile.id &&
      boardUtil.getDistance(startTile.id, tileId) <= range &&
			isOnLOS(startTile.id, tileId)
    ) {
			rangeTilesId.push(tileId);
    }
  });
  return rangeTilesId;
};
