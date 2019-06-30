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
const renderTiles = level => {
  const board = levels[level];
  const boardSize = board.size.width * board.size.height;
  // for (let x=0; x<board.size.height; x++) {

  // }
  return Array(boardSize)
    .fill()
    .map((_, i) => {
      const x = getTileX(board, i);
      const y = getTileY(board, i);
      const id = getTileId(x, y);
      return <Tile id={id} />;
    });
};

const renderWalls = level => {
  const board = levels[level];
  return board.walls.map((wall, index) => {
    const id = wall.tile;
    return <Wall id={id} />;
  });
};

const Board = props => {
  const { level } = props;
  return (
    <StyledBoard>
      {renderTiles(level)}
      {renderWalls(level)}
    </StyledBoard>
  );
};

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;

export default Board;
