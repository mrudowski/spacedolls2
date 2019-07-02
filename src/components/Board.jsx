import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import Tile from '../styled/Tile';
import Wall from './Wall';
import StyledBoard from '../styled/Board';
import { getTileXFromId, getTileYFromId } from '../brain/utils';

const propTypes = {
  level: PropTypes.string
};

const defaultProps = {
  level: '1'
};

// floor and hotspot for now
const renderTiles = (tileMap, selectedTileId) => {
  // tileMap - tileMap.entries()
  //return [...tileMap].map(([key, value]) => <Tile id={key} key={`${key}`} />);
  return map(tileMap, (tile, tileId) => {
    const selected = tileId === selectedTileId;
    return <Tile id={tileId} key={`${tileId}`} selected={selected} />;
  });
};

const renderWalls = tileMap => {
  // return [...tileMap].map(([key, value]) => {
  //   if (value.occupiedBy.indexOf('wall') !== -1) {
  //     return <Wall id={key} key={`${key}`} />;
  //   }
  // });
  return map(tileMap, (tile, tileId) => {
    if (tile.occupiedBy.indexOf('wall') !== -1) {
      const x = getTileXFromId(tileId);
      const y = getTileYFromId(tileId);
      return <Wall id={tileId} key={`${tileId}`} posX={x} posY={y} />;
    }
  });
};

const Board = props => {
  const { data, selectedTileId } = props;
  return (
    <StyledBoard>
      <div>{renderTiles(data, selectedTileId)}</div>
      <div>{renderWalls(data)}</div>
    </StyledBoard>
  );
};

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;

export default Board;
