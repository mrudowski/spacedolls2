import React from 'react';
import { useSelector } from 'react-redux';
import forEach from 'lodash/each';
import board from '../redux/board';
import { getTileXFromId, getTileYFromId } from '../utils/tile';
import { StyledMoveGizmo, StyledGizmoTile } from '../styled/StyledMoveGizmo';
import { prepareGrid, calculatePath } from '../utils/pathFinder';

// manhattanDistance -linear movement - no diagonals - just cardinal directions (NSEW)
const getDistance = (startTileId, endTileId) => {
  const distance =
    Math.abs(getTileXFromId(startTileId) - getTileXFromId(endTileId)) +
    Math.abs(getTileYFromId(startTileId) - getTileYFromId(endTileId));
  //console.log('getDistance', distance);
  return distance;
};

//walkableArea /validTiles
const getPossibleMoveArea = (startTileId, tiles) => {
  //const validTiles = [];
  validTilesTest = [];

  // we check all tiles - not best but easy
  // of course it would be better when counting from doll (flood fill?)

  //let grid =
  prepareGrid(tiles);

  forEach(tiles, (tile, tileId) => {
    //distance bigger or not
    // TODO isWalkable to the utils
    if (!tile.wall && !tile.doll && getDistance(startTileId, tileId) <= 2) {
      //let end = trueThis.getGraphNode(tile, graph);
      //let path = astar.search(graph, start, end);
      // if (path.length > 0 && path.length <= activeDoll.stats.move) {
      //console.log('result for', tile.id, 'is', result);
      const startX = getTileXFromId(startTileId);
      const startY = getTileYFromId(startTileId);
      const endX = getTileXFromId(tileId);
      const endY = getTileYFromId(tileId);

      // and check if tile already added

      calculatePath(startX, startY, endX, endY, addTileToValidTiles);

      // }
      //validTiles.push(tileId);
    }
  });

  //return validTiles;
  return validTilesTest;
};

let validTilesTest = [];

//asynchronize
const addTileToValidTiles = path => {
  if (path === null || path.length === 0) {
    console.log('no found!', path.length === 0 ? 'path length = 0' : '');
  } else {
    console.log('Path was found', 'path length', path.length, path);
    //Path was found path length 0 []
    // all path? and check if tile added
    if (path.length < 4) {
      const tileXY = path[path.length - 1];
      validTilesTest.push(tileXY);
    }
  }
};

const renderTiles = setOfTileIds => {
  // TODO: tileId not tileData
  const tilesToRender = [];
  setOfTileIds.forEach(({ x, y }, index) => {
    // const x = getTileXFromId(tileId);
    // const y = getTileYFromId(tileId);
    tilesToRender.push(
      <StyledGizmoTile $x={x} $y={y} key={`tile-${x},${y}`} />
    );
  });
  return tilesToRender;
};

// TODO why select, we only need store state to calculate?!
// use state inside utils?

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
