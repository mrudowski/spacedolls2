import React from 'react';
import { useSelector } from 'react-redux';
import dolls from '../redux/dolls';
import board from '../redux/board';
import actions, {MOVE, ATTACK} from '../redux/actions';
import * as boardUtil from '../utils/board';
import Tile from './Tile';
import Wall from './Wall';
import Doll from './Doll';
import MoveGizmo from './MoveGizmo';
import AttackGizmoContainer from './AttackGizmoContainer';

// https://medium.com/inturn-eng/naming-styled-components-d7097950a245
import * as Styled from '../styled/Board';
import DevGizmo from './DevGizmo';
import { PoseGroup } from 'react-pose';

const Board = () => {
  const dollsData = useSelector(dolls.selectors.getDolls);
	const selectedDollId = useSelector(dolls.selectors.getSelectedDollId);
  // this is the same selector like parent node Level... better by prop?
  const activeAction = useSelector(actions.selectors.getActiveAction);

	// do we need selectedTileId?
  const selectedTileId = useSelector(board.selectors.getSelectedTileId);
  const selectedTile = useSelector(board.selectors.getSelectedTile);
  const tiles = useSelector(board.selectors.getTiles);
	const { width: boardWidth, height: boardHeight } = useSelector(board.selectors.getSize);

	console.log('Board');

  const renderAll = () => {
    const tilesToRender = [];
    const wallsToRender = [];
    const dollsToRender = [];
    boardUtil.forEachTile(tiles, (tile, tileId) => {
      const selected = tileId === selectedTileId;
      tilesToRender.push(
        <Tile
          id={tileId}
          key={`tile-${tileId}`}
          selected={selected}
          hasDoll={tile.dollId}
        />
      );

      // TODO hasDoll
      if (tile.wall) {
        wallsToRender.push(
          <Wall
            tileId={tileId}
            data={tile.wall}
            key={`wall-${tileId}`}
          />
        );
      } else if (tile.dollId) {
        const dollId = tile.dollId;
        dollsToRender.push(
          <Doll
            data={dollsData[dollId]}
            tileId={tileId}
            selected={selected}
            key={`doll-${dollId}`}
          />
        );
      }
    });
    return (
      <React.Fragment>
        <div>{tilesToRender}</div>
        <div>{wallsToRender}</div>
        <div>
          <PoseGroup animateOnMount={true} flipMove={false}>
            {dollsToRender}
          </PoseGroup>
        </div>
      </React.Fragment>
    );
  };

	return (
    <Styled.Board $width={boardWidth} $height={boardHeight}>
      {renderAll(tiles, dollsData, selectedTileId)}
      {activeAction === MOVE && <MoveGizmo />}
      {(activeAction === ATTACK && selectedDollId) &&
        <AttackGizmoContainer
          tiles={tiles}
          selectedTile={selectedTile}
        />
      }
      <DevGizmo/>
    </Styled.Board>
  );
};

export default Board;
