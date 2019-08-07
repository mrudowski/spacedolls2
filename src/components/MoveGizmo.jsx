import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import board from '../redux/board';
import actions from '../redux/actions';
import dolls from '../redux/dolls';
import * as tileUtil from '../utils/tile';
import * as moveActionUtil from '../utils/moveAction';
import { StyledGizmo, StyledMoveGizmoTile } from '../styled/Gizmos';

const renderTiles = (tilesId, dispatch) => {
  const tilesToRender = [];

  tilesId.forEach((tileId, index) => {
    const { x, y } = tileUtil.getXYFromId(tileId);
    tilesToRender.push(
      <StyledMoveGizmoTile
        $x={x}
        $y={y}
        key={`tile-${tileId}`}
        onClick={() => dispatch(actions.effects.moveSelectedDollTo(tileId))}
      />
    );
  });
  return tilesToRender;
};

const MoveGizmo = () => {
	const dollId = useSelector(dolls.selectors.getSelectedDollId);
  const selectedTile = useSelector(board.selectors.getSelectedTile);
  const tiles = useSelector(board.selectors.getTiles);
  const boardSize = useSelector(board.selectors.getSize);
  const dispatch = useDispatch();
  // change to utils tile.hasDoll(selectedTile)?
  if (!selectedTile.doll) {
    return null;
  }
  console.time('moveActionUtil.getRangeTilesIds');
  const rangeTilesIds = moveActionUtil.getRangeTilesIds(
		tiles,
		selectedTile,
		boardSize,
  );
	console.timeEnd('moveActionUtil.getRangeTilesIds');

	// console.time('moveActionUtil.getRangeTilesIds2');
	// const rangeTilesIds2 = moveActionUtil.getRangeTilesIds2(
   //  tiles,
	// 	selectedTile,
   //  boardSize,
	// );
	// console.timeEnd('moveActionUtil.getRangeTilesIds2');

  return (
    <StyledGizmo>
      {renderTiles(rangeTilesIds, dispatch)}
    </StyledGizmo>
  );
};

export default MoveGizmo;
