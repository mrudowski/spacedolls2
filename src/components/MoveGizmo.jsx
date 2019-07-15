import React from 'react';
import { useSelector } from 'react-redux';
import forEach from 'lodash/each';
import board from '../redux/board';
import { getTileXFromId, getTileYFromId } from '../utils/tile';
import { StyledMoveGizmo, StyledGizmoTile } from '../styled/StyledMoveGizmo';

// manhattanDistance -linear movement - no diagonals - just cardinal directions (NSEW)
const getDistance = (startTileId, endTileId) => {
  const distance =
    Math.abs(getTileXFromId(startTileId) - getTileXFromId(endTileId)) +
    Math.abs(getTileYFromId(startTileId) - getTileYFromId(endTileId));
  console.log('getDistance', distance);
  return distance;
};

//walkableArea /validTiles
const getPossibleMoveArea = (startTileId, tiles) => {
  const validTiles = [];

  //better counting from doll!!!
  forEach(tiles, (tile, tileId) => {
    //distance bigger or not
    // TODO isWalkable to the utils
    if (!tile.wall && !tile.doll && getDistance(startTileId, tileId) <= 2) {
      //let end = trueThis.getGraphNode(tile, graph);
      //let path = astar.search(graph, start, end);
      //let result = astar.search(trueThis.tiles, activeDoll.tileId, tileId);
      // if (path.length > 0 && path.length <= activeDoll.stats.move) {
      //console.log('result for', tile.id, 'is', result);

      // }
      validTiles.push(tileId);
    }
  });

  return validTiles;
};

const renderTiles = setOfTileIds => {
  // TODO: tileId not tileData
  const tilesToRender = [];
  setOfTileIds.forEach((tileId, index) => {
    const x = getTileXFromId(tileId);
    const y = getTileYFromId(tileId);
    tilesToRender.push(
      <StyledGizmoTile $x={x} $y={y} key={`tile-${tileId}`} />
    );
  });
  return tilesToRender;
};

const MoveGizmo = () => {
  // TODO: outside?
  // move button on active when moveGizmoOn
  // selected ring hides
  const moveGizmo = useSelector(board.selectors.isMoveGizmoActive);
  const selectedTileId = useSelector(board.selectors.selectedTileId);
  const tiles = useSelector(board.selectors.getTiles);
  if (!moveGizmo) {
    return null;
  }
  const possibleMoveArea = getPossibleMoveArea(selectedTileId, tiles);
  return <StyledMoveGizmo>{renderTiles(possibleMoveArea)}</StyledMoveGizmo>;
};

export default MoveGizmo;
