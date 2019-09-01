import React from 'react';
import { useSelector } from 'react-redux';
import actions from '../redux/actions';
import board from '../redux/board';
import * as tileUtil from '../utils/tile';
import { StyledLOFGizmo } from '../styled/Gizmos';
import * as painterUtil from '../utils/painter';

// Definitions:
// LOF - line of fire

const LOFGizmo = ({startTileId}) => {
	const endTileId = useSelector(actions.selectors.getHoveredTileId);
	const boardSize = useSelector(board.selectors.getSize);

	if (!endTileId) return null;

	const {x:startX, y:startY} = tileUtil.getXYFromId(startTileId);
	const {x:endX, y:endY} = tileUtil.getXYFromId(endTileId);

	const x1 = painterUtil.getTileCenter(startX),
				y1 = painterUtil.getTileCenter(startY),
				x2 = painterUtil.getTileCenter(endX),
				y2 = painterUtil.getTileCenter(endY);

	return (
		<StyledLOFGizmo $boardSize={boardSize}>
			<polyline
				points={`${x1},${y1} ${x2},${y2}`}
			/>
		</StyledLOFGizmo>
	);
};

export default LOFGizmo;
