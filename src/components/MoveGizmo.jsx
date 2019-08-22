import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import board from '../redux/board';
import actions from '../redux/actions';
import * as tileUtil from '../utils/tile';
import * as moveActionUtil from '../utils/moveAction';
import {StyledAttackGizmoTile, StyledGizmo, StyledMoveGizmoTile} from '../styled/Gizmos';
import PathGizmo from "./PathGizmo";

const MoveGizmo = () => {
  const selectedTile = useSelector(board.selectors.getSelectedTile);
  const tiles = useSelector(board.selectors.getTiles);
  const boardSize = useSelector(board.selectors.getSize);
  const dispatch = useDispatch();
  // TODO change to utils tile.hasDoll(selectedTile)?
  if (!selectedTile.dollId) {
    return null;
  }

  console.time('moveActionUtil.getRangeTilesIds');
  const rangeTilesIds = moveActionUtil.getRangeTilesIds(
		tiles,
		selectedTile,
		boardSize,
  );
	console.timeEnd('moveActionUtil.getRangeTilesIds');

  const showPathGizmo = tileId => {
    dispatch(actions.actions.setHoveredTileId(tileId));
  };

  const hidePathGizmo = () => {
    dispatch(actions.actions.setHoveredTileId(null));
  };

  const renderTiles = (tilesId) => {
    const tilesToRender = [];

    tilesId.forEach((tileId, index) => {
      const { x, y } = tileUtil.getXYFromId(tileId);
      tilesToRender.push(
        <StyledMoveGizmoTile
          $x={x}
          $y={y}
          key={`tile-${tileId}`}
          onClick={() => dispatch(actions.effects.moveSelectedDollTo(tileId))}
          onMouseOver={() => showPathGizmo(tileId)}
          onMouseOut={hidePathGizmo}
        />
      );
    });
    return tilesToRender;
  };

	// console.time('moveActionUtil.getRangeTilesIds2');
	// const rangeTilesIds2 = moveActionUtil.getRangeTilesIds2(
   //  tiles,
	// 	selectedTile,
   //  boardSize,
	// );
	// console.timeEnd('moveActionUtil.getRangeTilesIds2');

  return (
    <StyledGizmo>
      {renderTiles(rangeTilesIds)}
      <PathGizmo startTileId={selectedTile.id} />
    </StyledGizmo>
  );
};

export default MoveGizmo;
