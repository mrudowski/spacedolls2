import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';
import board from '../redux/board';
import * as tileUtil from '../utils/tile';
import * as boardUtil from '../utils/board';
import { StyledGizmo, StyledAttackGizmoTile, StyledFODGizmoTile } from '../styled/Gizmos';

// Definitions:
// FOD - field of destruction

// TODO break for two components that getFODTileId selector
const FODGizmo = ({FOD, startTileId}) => {
	const boardSize = useSelector(board.selectors.getSize);
	const FODTileId = useSelector(actions.selectors.getFODTileId);

	if (!FODTileId) return null;

	const tilesIds = [];
	boardUtil.forEachTileInRange(FODTileId, FOD - 1, boardSize, (x, y) => {
		const distance = boardUtil.getDistance(FODTileId, tileUtil.getIdFromXY(x,y));
		// we probably should calculate damage/distance based on diagonal (Euclidean) distance but Manhattan is ok for now
		// here we calculating damage for presentation only
		const damage = 0.5 - distance*0.15;
		tilesIds.push({x, y, damage});
	});

	const FODTiles = tilesIds.map((tileData, index) => {
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

	const {x:startX, y:startY} = tileUtil.getXYFromId(startTileId);
	const {x:endX, y:endY} = tileUtil.getXYFromId(FODTileId);

	return (
		<React.Fragment>
			<svg height="600" width="600">
				<line
					x1={startX * 40 + 40/2}
					y1={startY * 40 + 40/2}
					x2={endX * 40 + 40/2}
					y2={endY * 40 + 40/2}
					style={{stroke: "rgb(255,0,0)", strokeWidth: 1}}
				/>
			</svg>
			{FODTiles}
		</React.Fragment>
	)
};

const AttackGizmo = ({rangeTilesIds, startTileId, FOD}) => {
	// const [FODTileId, setFODTileId] = useState(null);
  const dispatch = useDispatch();

	// useState should be good enough but it would re-render component
	// + good: "heavy" getRangeTilesIds is parent (container) component
	// - bad: we still re-render all gizmo tiles on hover...
	// Other way?
	// 1. dispatch action by redux to child component? (knowing that it probably should not be part of global state)
	// 2. ?

	console.log('AttackGizmo');

	const showFODGizmo = tileId => {
		// will be change to weapon slot

		// setFODTileId(tileId);
		dispatch(actions.actions.setFODTileId(tileId));
	};

	const hideFODGizmo = () => {
		// setFODTileId(null);
		dispatch(actions.actions.setFODTileId(null));
	};

	const renderRangeTiles = tilesIds => {
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
					key={`range-tile-${tileId}`}
					onClick={() => dispatch(actions.effects.attack(tileId))}
					onMouseOver={() => showFODGizmo(tileId)}
					onMouseOut={hideFODGizmo}
				/>
			);
		});
	};

	return (
    <StyledGizmo>
      {renderRangeTiles(rangeTilesIds)}
			<FODGizmo FOD={FOD} startTileId={startTileId}/>
    </StyledGizmo>
  );
};

export default AttackGizmo;