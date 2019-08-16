import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';
import board from '../redux/board';
import * as tileUtil from '../utils/tile';
import * as boardUtil from '../utils/board';
import { StyledGizmo, StyledAttackGizmoTile, StyledFODGizmoTile } from '../styled/Gizmos';

// Definitions:
// FOD - field of destruction

const FODGizmo = ({FOD}) => {
	const tiles = useSelector(board.selectors.getTiles);
	const boardSize = useSelector(board.selectors.getSize);
	const FODTileId = useSelector(actions.selectors.getFODTileId);
	console.log('FODGizmo', FODTileId, FOD);

	if (!FODTileId) return null;

	const getTileIfValid = (x,y) => {
		const tileId = tileUtil.getIdFromXY(x,y);
		const tileDM = tileUtil.getDataModel(tiles[tileId]);
	};

	// TODO add more tiles
	const tilesIds = [];
	const {x:FODX, y:FODY} = tileUtil.getXYFromId(FODTileId);
	// TODO utils?
	for (let x = Math.max(FODX - FOD + 1, 0); x <= Math.min(FODX + FOD - 1, boardSize.width - 1); x++) {
		for (let y = Math.max(FODY - FOD + 1, 0); y <= Math.min(FODY + FOD - 1, boardSize.height - 1); y++) {
			// TODO utils check if valid
			const distance = boardUtil.getDistance(FODTileId, tileUtil.getIdFromXY(x,y));
			// we could calculate damage/distance based on diagonal (Euclidean) distance but Manhattan fits well for our design
			// calculating damage for presentation only
			const damage = 0.5 - distance*0.15;
			tilesIds.push({x, y, damage});
		}
	}

	return tilesIds.map((tileData, index) => {
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

const AttackGizmo = ({rangeTilesIds, FOD}) => {
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
		dispatch(actions.effects.attack(tileId))
	};

	const hideFODGizmo = () => {
		// setFODTileId(null);
		dispatch(actions.effects.attack(null));
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
			<FODGizmo FOD={FOD}/>
    </StyledGizmo>
  );
};

export default AttackGizmo;