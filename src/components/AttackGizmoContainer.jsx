import React from 'react';
import { useSelector } from 'react-redux';
import dolls from '../redux/dolls';
import * as attackActionUtil from '../utils/attackAction';
import AttackGizmo from './AttackGizmo';


// FOD - field of destruction

const AttackGizmoContainer = ({tiles, selectedTile}) => {
	const dollDM = useSelector(dolls.selectors.getSelectedDollDM);
	const FOD = dollDM.getFOD();

	// functions

	console.time('attackActionUtil.getRangeTilesIds');
	const rangeTilesIds = attackActionUtil.getRangeTilesIds(
		tiles,
		selectedTile,
	);
	console.timeEnd('attackActionUtil.getRangeTilesIds');

	return (
		<AttackGizmo
			rangeTilesIds={rangeTilesIds}
			startTileId={selectedTile.id}
			FOD={FOD}
		/>
  );
};

export default AttackGizmoContainer;
