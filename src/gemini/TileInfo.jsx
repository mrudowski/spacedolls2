import React from 'react';
import PropTypes from 'prop-types';
import Styled from './styled/TileInfo';

const propTypes = {};

const defaultProps = {};

const TileInfo = ({ tile, levelData }) => {
  return (
    <Styled>
      tileId: {tile}
      <br />
      occupiedBy/content:
    </Styled>
  );
};

TileInfo.propTypes = propTypes;
TileInfo.defaultProps = defaultProps;

export default TileInfo;
