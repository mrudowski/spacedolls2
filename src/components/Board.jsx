import React from 'react';
import { useSelector } from 'react-redux';
import dolls from '../redux/dolls';
import board from '../redux/board';
import actions, {MOVE, ATTACK} from '../redux/actions';
import Tile from './Tile';
import Wall from './Wall';
import Doll from './Doll';
import MoveGizmo from './MoveGizmo';
import AttackGizmoContainer from "./AttackGizmoContainer";
import * as boardUtil from "../utils/board";

// https://medium.com/inturn-eng/naming-styled-components-d7097950a245
import * as Styled from '../styled/Board';
import DevGizmo from "./DevGizmo";

const renderAll = (tilesData, dollsData, selectedTileId) => {
  // tileMap - tileMap.entries()
  //return [...tileMap].map(([key, value]) => <Tile id={key} key={`${key}`} />);

  const tiles = [];
  const walls = [];
  const dolls = [];
  boardUtil.forEachTile(tilesData, (tile, tileId) => {
    const selected = tileId === selectedTileId;
    tiles.push(<Tile id={tileId} key={`tile-${tileId}`} selected={selected} hasDoll={tile.dollId} />);

    // TODO hasDoll
    if (tile.wall) {
      walls.push(<Wall tileId={tileId} key={`wall-${tileId}`} />);
    } else if (tile.dollId) {
      const dollId = tile.dollId;
      dolls.push(
        <Doll data={dollsData[dollId]} tileId={tileId} selected={selected} key={`doll-${dollId}`} />
      );
    }
  });
  return (
    <React.Fragment>
      <div>{tiles}</div>
      <div>{walls}</div>
      <div>{dolls}</div>
    </React.Fragment>
  );
};

const Board = () => {
  const dollsData = useSelector(dolls.selectors.getDolls);
	const dollId = useSelector(dolls.selectors.getSelectedDollId);
  // this is the same selector like parent node Level... better by prop?
  const activeAction = useSelector(actions.selectors.getActiveAction);

	// do we need selectedTileId?
  const selectedTileId = useSelector(board.selectors.getSelectedTileId);
  const selectedTile = useSelector(board.selectors.getSelectedTile);
  const tiles = useSelector(board.selectors.getTiles);
	const { width: boardWidth, height: boardHeight } = useSelector(board.selectors.getSize);

	console.log('Board');

	return (
    <Styled.Board $width={boardWidth} $height={boardHeight}>
      {renderAll(tiles, dollsData, selectedTileId)}
      {activeAction === MOVE && <MoveGizmo />}
      {(activeAction === ATTACK && dollId) &&
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
