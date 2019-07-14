import React from 'react';
import { useSelector } from 'react-redux';
import board from '../redux/board';
import { getTileXFromId, getTileYFromId } from '../utils/tile';
import { StyledMoveGizmo, StyledGizmoTile } from '../styled/StyledMoveGizmo';

const renderTiles = tilesData => {
  // TODO: tileId not tileData
  const tilesToRender = [];
  tilesData.forEach((tile, index) => {
    const x = getTileXFromId(tile.id);
    const y = getTileYFromId(tile.id);
    tilesToRender.push(
      <StyledGizmoTile $x={x} $y={y} key={`tile-${tile.id}`} />
    );
  });
  return tilesToRender;
};

const MoveGizmo = () => {
  // TODO: outside?
  // move button on active when moveGizmoOn
  // selected ring hides
  const moveGizmo = useSelector(board.selectors.isMoveGizmoActive);
  const selectedTile = useSelector(board.selectors.getSelectedTile);
  if (!moveGizmo) {
    return null;
  }
  const tilesData = [selectedTile];
  return <StyledMoveGizmo>{renderTiles(tilesData)}</StyledMoveGizmo>;
};

export default MoveGizmo;
