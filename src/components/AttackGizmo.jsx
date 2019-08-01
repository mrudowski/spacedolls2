import React from 'react';
import { useDispatch } from 'react-redux';
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
        onClick={() => dispatch(actions.effects.moveSelectedDollTo(tileId))}
      />
    );
  });
  return tilesToRender;
};

const AttackGizmo = ({dollId, tiles, selectedTileId}) => {
  const dispatch = useDispatch();

  const possibleMoveTilesId = moveActionUtil.getPossibleMoveTilesId(
		selectedTileId,
    tiles,
		dollId
  );

  return (
    <StyledMoveGizmo>
      {renderTiles(possibleMoveTilesId, dispatch)}
    </StyledMoveGizmo>
  );
};

export default AttackGizmo;
