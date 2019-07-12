import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './Board';
import TileInfo from './TileInfo';
import { changeLevel, setBoard, toggleWall } from '../redux/actions';
import {
  getCurrentLevelId,
  getSelectedTileId,
  getBoardData
} from '../redux/selectors';
import { getLevel } from '../brain/utils';

export default function Level() {
  console.log('level');

  const selectedTileId = useSelector(getSelectedTileId);
  const currentLevelId = useSelector(getCurrentLevelId);
  const boardData = useSelector(getBoardData);
  const dispatch = useDispatch();

  // for now only
  useEffect(() => {
    console.log('useEffect');
    dispatch(setBoard('1'));
    dispatch(changeLevel('1'));
    //start();
  }, [dispatch]);

  if (!currentLevelId) {
    return null;
  }

  const dispatchToggleWall = () => dispatch(toggleWall(selectedTileId));
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
        <button onClick={dispatchToggleWall}>toggle wall</button>
      </div>
    </div>
  );
}
