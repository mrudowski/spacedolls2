import React from 'react';
import PropTypes from 'prop-types';
import Styled from '../styled/TileInfo';

const propTypes = {};

const defaultProps = {};

const getOccupiedBy = tile => {
  const elements = [];
  if (tile.wall) elements.push('wall');
  if (tile.doll) elements.push('doll');
  return elements.join(', ') || 'nothing';
};

const TileInfo = ({ tileId, tiles }) => {
  if (tileId) {
    return (
      <Styled>
        <h4>Selected</h4>
        tileId: {tileId}
        <br />
        occupiedBy/content: {getOccupiedBy(tiles[tileId])}
      </Styled>
    );
  } else {
    return (
      <Styled>
        <h4>Selected</h4>
        no tile selected
      </Styled>
    );
  }
};

TileInfo.propTypes = propTypes;
TileInfo.defaultProps = defaultProps;

export default TileInfo;
