import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import board from '../redux/board';
import actions from '../redux/actions';
import * as tileUtil from '../utils/tile';
import * as moveActionUtil from '../utils/moveAction';
import { StyledMoveGizmo, StyledGizmoTile } from '../styled/StyledMoveGizmo';

const renderTiles = (tilesId, dispatch) => {
  const tilesToRender = [];

  tilesId.forEach((tileId, index) => {
    const { x, y } = tileUtil.getXYFromId(tileId);
    tilesToRender.push(
      <StyledGizmoTile
        $x={x}
        $y={y}
        key={`tile-${tileId}`}
        onClick={() => dispatch(actions.actions.moveSelectedDollTo(tileId))}
      />
    );
  });
  return tilesToRender;
};

const MoveGizmo = () => {
  const selectedTile = useSelector(board.selectors.getSelectedTile);
  const tiles = useSelector(board.selectors.getTiles);
  const dispatch = useDispatch();
  // change to utils tile.hasDoll(selectedTile)?
  if (!selectedTile.doll) {
    return null;
  }
  const possibleMoveTilesId = moveActionUtil.getPossibleMoveTilesId(
    selectedTile.id,
    tiles
  );

  return (
    <StyledMoveGizmo>
      {renderTiles(possibleMoveTilesId, dispatch)}
    </StyledMoveGizmo>
  );
};

export default MoveGizmo;
