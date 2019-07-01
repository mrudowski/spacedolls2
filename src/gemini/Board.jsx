import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
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

// floor
const renderTiles = tileMap => {
  // tileMap - tileMap.entries()
  //return [...tileMap].map(([key, value]) => <Tile id={key} key={`${key}`} />);
  return map(tileMap, (tile, tileId) => <Tile id={tileId} key={`${tileId}`} />);
};

const renderWalls = tileMap => {
  // return [...tileMap].map(([key, value]) => {
  //   if (value.occupiedBy.indexOf('wall') !== -1) {
  //     return <Wall id={key} key={`${key}`} />;
  //   }
  // });
  return map(tileMap, (tile, tileId) => {
    if (tile.occupiedBy.indexOf('wall') !== -1) {
      return <Wall id={tileId} key={`${tileId}`} />;
    }
  });
};

const Board = props => {
  const { data } = props;
  return (
    <StyledBoard>
      <div>{renderTiles(data)}</div>
      <div>{renderWalls(data)}</div>
    </StyledBoard>
  );
};

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;

export default Board;
