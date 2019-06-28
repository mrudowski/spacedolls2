import React from 'react';
import PropTypes from 'prop-types';
import levels from '../data/levels';
import Tile from './Tile';
import StyledBoard from './styled/Board';

const propTypes = {
  level: PropTypes.string
};

const defaultProps = {
  level: '1'
};

const getTileX = (board, tileId) => tileId % board.size.width;

// floor
const renderTiles = level => {
  const board = levels[level];
  const boardSize = board.size.width * board.size.height;
  return Array(boardSize)
    .fill()
    .map((_, i) => <Tile>({getTileX(board, i)})</Tile>);
};

const Board = props => {
  const { level } = props;
  return (
    <div>
      <p>{levels[level].name}</p>
      <StyledBoard>{renderTiles(level)}</StyledBoard>
    </div>
  );
};

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;

export default Board;
