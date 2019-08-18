import React from 'react';
import { useSelector } from 'react-redux';
import actions from '../redux/actions';
import board from '../redux/board';
import * as tileUtil from '../utils/tile';
import * as boardUtil from '../utils/board';
import { StyledFODGizmoTile, StyledLOFGizmo } from '../styled/Gizmos';

// Definitions:
// LOF - line of fire

// TODO move to styled component
const LOFGizmo = ({startTileId}) => {
	const FODTileId = useSelector(actions.selectors.getFODTileId);
	const boardSize = useSelector(board.selectors.getSize);

	if (!FODTileId) return null;

	const {x:startX, y:startY} = tileUtil.getXYFromId(startTileId);
	const {x:endX, y:endY} = tileUtil.getXYFromId(FODTileId);

	const x1 = startX * 40 + 40/2,
				y1 = startY * 40 + 40/2,
				x2 = endX * 40 + 40/2,
				y2 = endY * 40 + 40/2;

	return (
		<StyledLOFGizmo $boardSize={boardSize}>
			<polyline
				points={`${x1},${y1} ${x2},${y2}`}
			/>
		</StyledLOFGizmo>
	)
};

export default LOFGizmo;