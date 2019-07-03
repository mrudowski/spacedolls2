import React from 'react';
import PropTypes from 'prop-types';
import foreach from 'lodash/each';
import Tile from './Tile';
import Wall from './Wall';
// https://medium.com/inturn-eng/naming-styled-components-d7097950a245
import * as Styled from '../styled/Board';

const propTypes = {
  level: PropTypes.string
};

const defaultProps = {
  level: '1'
};

// separate it?
// tileData is not the best way
// we could have walls, dolls and selected sepereted
// we could create tileData with occupied flag only when needed


const renderAll = (tileData, selectedTileId) => {
  // tileMap - tileMap.entries()
  //return [...tileMap].map(([key, value]) => <Tile id={key} key={`${key}`} />);

  const tiles = [];
  const walls = [];
  const dolls = [];
  foreach(tileData, (tile, tileId) => {
    const selected = tileId === selectedTileId;
    tiles.push(<Tile id={tileId} key={`tile-${tileId}`} selected={selected} />);

    if (tile.occupiedBy.indexOf('wall') !== -1) {
      walls.push(<Wall tileId={tileId} key={`wall-${tileId}`} />);
    }
    if (tile.occupiedBy.indexOf('doll') !== -1) {
      dolls.push(<Wall tileId={tileId} key={`doll-${tileId}`} />);
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
  const { data, selectedTileId } = props;
  return (
    <Styled.Board>
      <div>{renderAll(data, selectedTileId)}</div>
    </Styled.Board>
  );
};

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;

export default Board;
