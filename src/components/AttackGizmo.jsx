import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import actions from '../redux/actions';
import * as tileUtil from '../utils/tile';
import { StyledGizmo, StyledAttackGizmoTile, StyledFODGizmoTile } from '../styled/Gizmos';

// FOD - field of destruction

const AttackGizmo = ({rangeTilesIds, FOD}) => {
  const dispatch = useDispatch();
  const [FODTileId, setFODTileId] = useState(null);

	const showFODGizmo = tileId => {
		// will be change to weapon slot

		// TODO - it rerender component
		// + done: getRangeTilesIds should be in parent component - in container component!
		// - but we still rerender whole component on hover...
		// other way?
		// 1. dispatch action to child component? // but this probably should not be part of global state

		// WRONG, because parent will rerender?
		// 2. callback to parent? (or dispatch to parent?)
		//    - parent set state
		//		- parent has two presentation components

		setFODTileId(tileId);
		dispatch(actions.effects.attack(tileId))
	};

	const hideFODGizmo = () => {
		setFODTileId(null);
	};

	const renderRangeTiles = tilesIds => {
		console.log('renderRangeTiles');
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

	const renderFODTiles = tilesIds => {
		return tilesIds.map((tileId, index) => {
			const { x, y } = tileUtil.getXYFromId(tileId);
			return (
				<StyledFODGizmoTile
					$x={x}
					$y={y}
					key={`fod-tile-${tileId}`}
				/>
			);
		});
	};

	return (
    <StyledGizmo>
      {renderRangeTiles(rangeTilesIds)}
			{FODTileId && renderFODTiles([FODTileId])}
    </StyledGizmo>
  );
};

export default AttackGizmo;