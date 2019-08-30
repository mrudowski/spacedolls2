import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../redux/actions';
import * as tileUtil from '../utils/tile';
import FODGizmo from './FODGizmo';
import LOFGizmo from './LOFGizmo';
import { StyledGizmo, StyledAttackGizmoTile } from '../styled/Gizmos';

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
		dispatch(actions.actions.setHoveredTileId(tileId));
	};

	const hideFODGizmo = () => {
		// setFODTileId(null);
		dispatch(actions.actions.setHoveredTileId(null));
	};

	const renderRangeTiles = tilesIds =>
		tilesIds.map(tileId => {
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

	return (
    <StyledGizmo>
      {renderRangeTiles(rangeTilesIds)}
			<FODGizmo FOD={FOD} />
			<LOFGizmo startTileId={startTileId} />
    </StyledGizmo>
  );
};

export default AttackGizmo;
