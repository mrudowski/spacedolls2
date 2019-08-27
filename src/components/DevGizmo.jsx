import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import board from '../redux/board';
import devTools from '../redux/devTools';
import * as boardUtil from "../utils/board";
import * as tileUtil from '../utils/tile';
import {StyledGizmo, StyledMoveGizmoTile} from '../styled/Gizmos';

const DevGizmo = () => {
  const activeAction = useSelector(devTools.selectors.getActiveAction);
  const tiles = useSelector(board.selectors.getTiles);
  const boardSize = useSelector(board.selectors.getSize);
  const dispatch = useDispatch();

  if (!activeAction) {
    return null;
  }

  const showPathGizmo = tileId => {
    dispatch(actions.actions.setHoveredTileId(tileId));
  };

  const hidePathGizmo = () => {
    dispatch(actions.actions.setHoveredTileId(null));
  };

  const renderTiles = () => {
    const tilesToRender = [];
    // TODO make a Board utils
    // forEach(tiles, (tileId, index) => {
    //   const { x, y } = tileUtil.getXYFromId(tileId);
    //   tilesToRender.push(
    //     <StyledMoveGizmoTile
    //       $x={x}
    //       $y={y}
    //       key={`tile-${tileId}`}
    //       onClick={() => dispatch(actions.effects.moveSelectedDollTo(tileId))}
    //       onMouseOver={() => showPathGizmo(tileId)}
    //       onMouseOut={hidePathGizmo}
    //     />
    //   );
    // });
    return tilesToRender;
  };

  return (
    <StyledGizmo>
      {renderTiles()}
    </StyledGizmo>
  );
};

export default DevGizmo;
