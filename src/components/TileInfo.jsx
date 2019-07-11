import React from 'react';
import PropTypes from 'prop-types';
import Styled from '../styled/TileInfo';

const propTypes = {};

const defaultProps = {};

const getOccupiedBy = list => {
  const types = list.map(obj => {
    return obj.type;
  });
  return types.join(', ') || 'nothing';
};

const TileInfo = ({ tile, levelData }) => {
  if (tile) {
    return (
      <Styled>
        <h4>Selected</h4>
        tileId: {tile}
        <br />
        occupiedBy/content: {getOccupiedBy(levelData[tile].occupiedBy)}
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
