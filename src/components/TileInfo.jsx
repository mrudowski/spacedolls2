import React from 'react';
import PropTypes from 'prop-types';
import Styled from '../styled/TileInfo';

const propTypes = {};

const defaultProps = {};

const TileInfo = ({ tile, levelData }) => {
  if (tile) {
    return (
      <Styled>
        <h4>Selected</h4>
        tileId: {tile}
        <br />
        occupiedBy/content: {levelData[tile].occupiedBy.join(',') || 'nothing'}
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
