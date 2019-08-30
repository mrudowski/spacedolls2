import React from 'react';
import { useSelector } from 'react-redux';
import actions from '../redux/actions';
import board from '../redux/board';
import * as tileUtil from '../utils/tile';
import * as boardUtil from '../utils/board';
import { StyledFODGizmoTile } from '../styled/Gizmos';

// Definitions:
// FOD - field of destruction

const FODGizmo = ({FOD}) => {
	const boardSize = useSelector(board.selectors.getSize);
	const FODTileId = useSelector(actions.selectors.getHoveredTileId);

	if (!FODTileId) return null;

	const tilesIds = [];
	boardUtil.forEachTileInRange(FODTileId, FOD - 1, boardSize, (x, y) => {
		const distance = boardUtil.getDistance(FODTileId, tileUtil.getIdFromXY(x, y));
		// we probably should calculate damage/distance based on
		// diagonal (Euclidean) distance but Manhattan is ok for now
		// here we calculating damage for presentation only
		const damage = 0.5 - distance * 0.15;
		tilesIds.push({x, y, damage});
	});

	return tilesIds.map(tileData => {
		const {x, y, damage} = tileData;
		return (
			<StyledFODGizmoTile
				$x={x}
				$y={y}
				$damage={damage}
				key={`fod-tile-${x}-${y}`}
			/>
		);
	});
};

export default FODGizmo;
