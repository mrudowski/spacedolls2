import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../redux/actions';
import * as tileUtil from '../utils/tile';
import * as attackActionUtil from '../utils/attackAction';
import { StyledGizmo, StyledAttackGizmoTile } from '../styled/Gizmos';

const renderTiles = (tilesIds, dispatch) => {
  return tilesIds.map((tileId, index) => {
    const { x, y } = tileUtil.getXYFromId(tileId);
    return (
      <StyledAttackGizmoTile
        $x={x}
        $y={y}
        $borderRight={tilesIds.indexOf(tileUtil.getIdFromXY(x+1, y)) === -1}
        $borderBottom={tilesIds.indexOf(tileUtil.getIdFromXY(x, y+1)) === -1}
        $borderLeft={tilesIds.indexOf(tileUtil.getIdFromXY(x-1, y)) === -1}
        $borderTop={tilesIds.indexOf(tileUtil.getIdFromXY(x, y-1)) === -1}
        key={`tile-${tileId}`}
        onClick={() => dispatch(actions.effects.attack(tileId))}
      />
    );
  });
};

const AttackGizmo = ({tiles, selectedTile}) => {
  const dispatch = useDispatch();

	console.time('getRangeTilesIds');
  const rangeTilesIds = attackActionUtil.getRangeTilesIds(
    tiles,
		selectedTile,
  );
	console.timeEnd('getRangeTilesIds');

  return (
    <StyledGizmo>
      {renderTiles(rangeTilesIds, dispatch)}
    </StyledGizmo>
  );
};

export default AttackGizmo;
