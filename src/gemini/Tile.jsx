import React from 'react';
import PropTypes from 'prop-types';
import StyledTile from './styled/Tile';

const propTypes = {};

const defaultProps = {};

const getTileX = id => id.split(',')[0];
const getTileY = id => id.split(',')[1];

const Tile = ({ id }) => {
  const x = getTileX(id);
  const y = getTileY(id);
  return (
    <StyledTile>
      <div className="coordinates">{id}</div>
    </StyledTile>
  );
};

Tile.propTypes = propTypes;
Tile.defaultProps = defaultProps;

export default Tile;
