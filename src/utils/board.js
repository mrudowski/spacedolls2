import * as tileUtil from './tile';

// manhattanDistance
// - linear movement
// - no diagonals
// - just cardinal directions (NSEW)

export const getDistance = (startTileId, endTileId) => {
  const { x: startX, y: startY } = tileUtil.getXYFromId(startTileId);
  const { x: endX, y: endY } = tileUtil.getXYFromId(endTileId);
  return Math.abs(startX - endX) + Math.abs(startY - endY);
};
