import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './Board';
import TileInfo from './TileInfo';
import levels from '../data/levels';
import { changeLevel } from './redux/actions';
import { getCurrentLevelId } from './redux/selectors';
import { getLevel, prepareBoardData, prepareBoardData2 } from './brain/utils';

let selectedTile = '0,0';

export default function Level() {
  const currentLevelId = useSelector(getCurrentLevelId);
  const dispatch = useDispatch();

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
        <Board data={boardData} />
        <TileInfo tile={selectedTile} levelData={boardData} />
      </div>
    </div>
  );
}
