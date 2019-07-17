import React from 'react';
import { useSelector } from 'react-redux';
import foreach from 'lodash/each';
import Tile from './Tile';
import Wall from './Wall';
import Doll from './Doll';
// https://medium.com/inturn-eng/naming-styled-components-d7097950a245
import * as Styled from '../styled/Board';
import dolls from '../redux/dolls';
import MoveGizmo from './MoveGizmo';

const renderAll = (tilesData, dollsData, selectedTileId, currentLevelId) => {
  // tileMap - tileMap.entries()
  //return [...tileMap].map(([key, value]) => <Tile id={key} key={`${key}`} />);

  const tiles = [];
  const walls = [];
  const dolls = [];
  foreach(tilesData, (tile, tileId) => {
    const selected = tileId === selectedTileId;
    tiles.push(<Tile id={tileId} key={`tile-${tileId}`} selected={selected} />);

    if (tile.wall) {
      walls.push(<Wall tileId={tileId} key={`wall-${tileId}`} />);
    } else if (tile.doll) {
      const dollId = tile.doll;
      dolls.push(
        <Doll data={dollsData[dollId]} tileId={tileId} key={`doll-${dollId}`} />
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

const Board = props => {
  const dollsData = useSelector(dolls.selectors.getDolls);
  const { data, selectedTileId, currentLevelId } = props;

  console.log('Board');

  return (
    <Styled.Board>
      {renderAll(data, dollsData, selectedTileId, currentLevelId)}
      <MoveGizmo />
    </Styled.Board>
  );
};

export default Board;
