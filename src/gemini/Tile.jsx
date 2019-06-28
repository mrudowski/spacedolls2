import React from 'react';
import PropTypes from 'prop-types';
import StyledTile from './styled/Tile';

const propTypes = {};

const defaultProps = {};

const getTileX = (board, tileId) => tileId % board.size.width;

const Tile = props => {
  return <StyledTile>o</StyledTile>;
};

Tile.propTypes = propTypes;
Tile.defaultProps = defaultProps;

export default Tile;
