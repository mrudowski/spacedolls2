import React from 'react';
import { useSelector } from 'react-redux';
import actions from '../redux/actions';
import board from '../redux/board';
import * as tileUtil from '../utils/tile';
import { StyledPathGizmo } from '../styled/Gizmos';
import * as painterUtil from '../utils/painter';

const PathGizmo = ({startTileId, paths}) => {
	const endTileId = useSelector(actions.selectors.getHoveredTileId);
	const boardSize = useSelector(board.selectors.getSize);

	if (!endTileId || !paths[endTileId]) return null;

	const path = [
		startTileId,
		...paths[endTileId]
	];

	const pointsAsArray = path.map(tileId => {
		const {x, y} = tileUtil.getXYFromId(tileId);
		const pointX = painterUtil.getTileCenter(x),
					pointY = painterUtil.getTileCenter(y);
		return `${pointX},${pointY}`;
	});

	return (
		<StyledPathGizmo $boardSize={boardSize}>
			<polyline
				points={pointsAsArray.join(' ')}
			/>
		</StyledPathGizmo>
	);
};

export default PathGizmo;
