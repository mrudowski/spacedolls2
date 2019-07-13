import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './Board';
import TileInfo from './TileInfo';
import { setBoard, toggleWall } from '../redux/board/actions';
import { getBoardData } from '../redux/board/selectors';
import { getLevel } from '../brain/utils';
import level from '../redux/level';
import dolls from '../redux/dolls';
import DollInfo from './DollInfo';

export default function Level() {
  const {currentLevelId, selectedTileId} = useSelector(level.selectors.getLevel);
  const boardData = useSelector(getBoardData);
  const dispatch = useDispatch();

  console.log('level');

  // for now only
  useEffect(() => {
    console.log('useEffect');
    dispatch(setBoard('1'));
    dispatch(dolls.actions.create('1')); //?
    dispatch(level.actions.changeLevel('1'));
    //start();
  }, [dispatch]);

  if (!currentLevelId) {
    return null;
  }

  const dispatchToggleWall = () =>
    dispatch(toggleWall(selectedTileId));
  const levelData = getLevel(currentLevelId);

  return (
    <div>
      <h4>
        level id: {levelData.id} _ level name: {levelData.name}
      </h4>
      <hr />
      <div style={{ position: 'relative', textAlign: 'left' }}>
        <Board
          data={boardData}
          selectedTileId={selectedTileId}
          currentLevelId={currentLevelId}
        />
        <TileInfo tileId={selectedTileId} tiles={boardData} />
        <DollInfo />
        <button onClick={dispatchToggleWall}>toggle wall</button>
      </div>
    </div>
  );
}
