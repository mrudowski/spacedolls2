import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './Board';
import TileInfo from './TileInfo';
import { getLevel } from '../utils/level';
import level from '../redux/level';
import dolls from '../redux/dolls';
import board from '../redux/board';
import DollInfo from './DollInfo';

export default function Level() {
  const moveGizmo = useSelector(board.selectors.isMoveGizmoActive);
  const { currentLevelId } = useSelector(level.selectors.getLevel);
  const { selectedTileId, tiles: tilesData } = useSelector(
    board.selectors.getBoard
  );
  const selectedTile = useSelector(board.selectors.getSelectedTile);
  const dispatch = useDispatch();

  console.log('Level');

  // for now only
  useEffect(() => {
    console.log('useEffect');
    dispatch(board.actions.setBoard('1'));
    dispatch(dolls.actions.create('1')); //?
    dispatch(level.actions.changeLevel('1'));
    //start();
  }, [dispatch]);

  if (!currentLevelId) {
    return null;
  }

  const dispatchToggleWall = () => dispatch(board.actions.toggleWall());

  const toggleMoveGizmo = () => dispatch(board.actions.toggleMoveGizmo());

  const isDollSelected = () => {
    return selectedTile && selectedTile.doll;
  };

  const levelData = getLevel(currentLevelId);

  // TODO - styled button with active class

  return (
    <div>
      <h4>
        level id: {levelData.id} _ level name: {levelData.name}
      </h4>
      <hr />
      <div style={{ position: 'relative', textAlign: 'left' }}>
        <Board
          data={tilesData}
          selectedTileId={selectedTileId}
          currentLevelId={currentLevelId}
        />
        <TileInfo tile={selectedTile} />
        <DollInfo />
        <button onClick={dispatchToggleWall} disabled={isDollSelected()}>
          toggle wall
        </button>
        <button
          onClick={toggleMoveGizmo}
          disabled={!isDollSelected() && !moveGizmo}
        >
          move
        </button>
      </div>
    </div>
  );
}
