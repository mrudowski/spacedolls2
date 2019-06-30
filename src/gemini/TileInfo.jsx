import React from 'react';
import PropTypes from 'prop-types';
import Styled from './styled/TileInfo';

const propTypes = {};

const defaultProps = {};

const TileInfo = ({ tile, levelData }) => {
  return (
    <Styled>
      <h4>Selected</h4>
      tileId: {tile}
      <br />
      occupiedBy/content:{' '}
      {levelData.get(tile).occupiedBy.length > 0 ? 'yes' : 'none'}
    </Styled>
  );
};

TileInfo.propTypes = propTypes;
TileInfo.defaultProps = defaultProps;

export default TileInfo;
