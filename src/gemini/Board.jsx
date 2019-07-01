import React from 'react';
import PropTypes from 'prop-types';
import levels from '../data/levels';
import Tile from './Tile';
import Wall from './Wall';
import StyledBoard from './styled/Board';

const propTypes = {
  level: PropTypes.string
};

const defaultProps = {
  level: '1'
};

const getTileX = (board, tileId) => tileId % board.size.width;
const getTileY = (board, tileId) => Math.floor(tileId / board.size.height);
const getTileId = (x, y) => `${x},${y}`;

// const getTileX = (board, tileId) => tileId % board.size.width;

// floor
const renderTiles = board => {
  return [...board].map(([key, value]) => {
    return <Tile id={key} key={`tile-${key}`} />;
  });
};

const renderWalls = level => {
  // const board = levels[level];
  // return board.walls.map((wall, index) => {
  //   const id = wall.tile;
  //   return <Wall id={id} key={`wall-${id}`} />;
  // });
};

const Board = props => {
  const { data } = props;
  return (
    <StyledBoard>
      {renderTiles(data)}
      {renderWalls(data)}
    </StyledBoard>
  );
};

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;

export default Board;
