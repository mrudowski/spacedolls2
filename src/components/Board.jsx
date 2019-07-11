import React from 'react';
import PropTypes from 'prop-types';
import foreach from 'lodash/each';
import Tile from './Tile';
import Wall from './Wall';
import Doll from './Doll';
// https://medium.com/inturn-eng/naming-styled-components-d7097950a245
import * as Styled from '../styled/Board';

const propTypes = {};

const defaultProps = {};

const renderAll = (tileData, selectedTileId) => {
  // tileMap - tileMap.entries()
  //return [...tileMap].map(([key, value]) => <Tile id={key} key={`${key}`} />);

  const tiles = [];
  const walls = [];
  const dolls = [];
  foreach(tileData, (tile, tileId) => {
    const selected = tileId === selectedTileId;
    tiles.push(<Tile id={tileId} key={`tile-${tileId}`} selected={selected} />);

    tile.occupiedBy.forEach(obj => {
      switch (obj.type) {
        case 'wall':
          walls.push(<Wall tileId={tileId} key={`wall-${tileId}`} />);
          break;
        case 'doll':
          dolls.push(<Doll tileId={tileId} key={`doll-${tileId}`} team={obj.team} />);
          break;
        default:
          //do nothing
          break;
      }
    });
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
