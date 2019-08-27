import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './Board';
import TileInfo from './TileInfo';
import { getLevel } from '../utils/level';
import level from '../redux/level';
import dolls from '../redux/dolls';
import board from '../redux/board';
import actions, {MOVE, ATTACK} from '../redux/actions';
import devTools, {PAINT} from '../redux/devTools';
import DollInfo from './DollInfo';

export default function Level() {
  // TODO move buttons somewhere else
  const activeAction = useSelector(actions.selectors.getActiveAction);
  const activeDevAction = useSelector(devTools.selectors.getActiveAction);
  const { currentLevelId } = useSelector(level.selectors.getLevel);
  const selectedTile = useSelector(board.selectors.getSelectedTile);
  const dispatch = useDispatch();

  console.log('Level');

  // for now only
  useEffect(() => {
    console.log('useEffect');
    if (currentLevelId) {
      dispatch(board.actions.setBoard(currentLevelId));
      dispatch(dolls.actions.create(currentLevelId));
    }
    // dispatch(level.actions.changeLevel('1'));
  }, [dispatch, currentLevelId]);

  // TODO one function
  const togglePaintAction = () => dispatch(devTools.actions.toggleAction(PAINT));
  const toggleMoveAction = () => dispatch(actions.actions.toggleAction(MOVE));
  const toggleAttackAction = () => dispatch(actions.actions.toggleAction(ATTACK));

  // move to utils?
  const isDollSelected = () => {
    return selectedTile && selectedTile.dollId;
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
        <Board />
        <TileInfo tile={selectedTile} />
        <DollInfo />
        <button onClick={togglePaintAction}>
          Wall Painter {activeDevAction === PAINT && 'ON'}
        </button>

        {/*actions panel*/}
        <button
          onClick={toggleMoveAction}
          disabled={!isDollSelected() && activeAction !== MOVE}
        >
          move {activeAction === MOVE && 'ON'}
        </button>
        <button
          // primary action? what about medic?
          onClick={toggleAttackAction}
          disabled={!isDollSelected() && activeAction !== ATTACK}
        >
          attack {activeAction === ATTACK && 'ON'}
        </button>
      </div>
    </div>
  );
}
