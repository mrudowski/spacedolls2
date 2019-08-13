import React, {useState} from 'react';
import * as dollUtil from '../utils/doll';
import * as attackActionUtil from '../utils/attackAction';
import AttackGizmo from './AttackGizmo';

// FOD - field of destruction

const AttackGizmoContainer = ({tiles, selectedTile}) => {
	const dollId = dollUtil.getDollFromTile(selectedTile);
	const FOD = dollUtil.getDollMetaData(dollId).stats.fieldOfDestruction;

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
			FOD={FOD}
		/>
  );
};

export default AttackGizmoContainer;
