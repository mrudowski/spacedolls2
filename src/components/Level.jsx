import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './Board';
import TileInfo from './TileInfo';
import { changeLevel } from '../redux/actions';
import { getCurrentLevelId, getSelectedTileId } from '../redux/selectors';
import { getLevel, prepareBoardData } from '../brain/utils';

export default function Level() {
  const selectedTileId = useSelector(getSelectedTileId);
  const currentLevelId = useSelector(getCurrentLevelId);
  const dispatch = useDispatch();

  const toggleWall = () => dispatch(toggleWall());

  // for now only
  useEffect(() => {
    console.log('useEffect');
    const start = () => dispatch(changeLevel('1'));
    start();
  }, [dispatch]);

  if (!currentLevelId) {
    return null;
  }
  let boardData = prepareBoardData(currentLevelId);
  console.log('boardData', boardData);
  const levelData = getLevel(currentLevelId);

  return (
    <div>
      <h4>
        level id: {levelData.id} _ level name: {levelData.name}
      </h4>
      <hr />
      <div style={{ position: 'relative', textAlign: 'left' }}>
        <Board data={boardData} selectedTileId={selectedTileId} />
        <TileInfo tile={selectedTileId} levelData={boardData} />
        <button onClick={toggleWall}>toggle wall</button>
      </div>
    </div>
  );
}
