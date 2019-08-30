import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import board from '../redux/board';
import devTools from '../redux/devTools';
import * as boardUtil from '../utils/board';
import * as tileUtil from '../utils/tile';
import {StyledDevGizmo, StyledGizmoTile} from '../styled/Gizmos';

const DevGizmo = () => {
  const activeAction = useSelector(devTools.selectors.getActiveAction);
  const tiles = useSelector(board.selectors.getTiles);
  const dispatch = useDispatch();

  if (!activeAction) {
    return null;
  }

  const renderTiles = () => {
    const tilesToRender = [];
    boardUtil.forEachTile(tiles, (tile, tileId) => {
      const { x, y } = tileUtil.getXYFromId(tileId);
      tilesToRender.push(
        <StyledGizmoTile
          $x={x}
          $y={y}
          key={`tile-${tileId}`}
          onClick={() => dispatch(board.actions.toggleWall(tileId))}
        />
      )
    });
    return tilesToRender;
  };

  return (
    <StyledDevGizmo>
      {renderTiles()}
    </StyledDevGizmo>
  );
};

export default DevGizmo;
