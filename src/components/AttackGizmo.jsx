import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../redux/actions';
import * as tileUtil from '../utils/tile';
import * as attackActionUtil from '../utils/attackAction';
import { StyledMoveGizmo, StyledGizmoTile } from '../styled/StyledMoveGizmo';

const renderTiles = (tilesIds, dispatch) => {
  return tilesIds.map((tileId, index) => {
    const { x, y } = tileUtil.getXYFromId(tileId);
    return (
      <StyledGizmoTile
        $x={x}
        $y={y}
        key={`tile-${tileId}`}
        onClick={() => dispatch(actions.effects.attack(tileId))}
      />
    );
  });
};

const AttackGizmo = ({tiles, selectedTile}) => {
  const dispatch = useDispatch();

  const rangeTilesIds = attackActionUtil.getRangeTilesIds(
    tiles,
		selectedTile,
  );

  return (
    <StyledMoveGizmo>
      {renderTiles(rangeTilesIds, dispatch)}
    </StyledMoveGizmo>
  );
};

export default AttackGizmo;
