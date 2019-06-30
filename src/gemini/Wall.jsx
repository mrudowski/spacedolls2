import React from 'react';
import PropTypes from 'prop-types';
import StyledWall from './styled/Wall';

const propTypes = {};

const defaultProps = {};

const getTileX = id => id.split(',')[0];
const getTileY = id => id.split(',')[1];

const Wall = ({ id }) => {
  const x = getTileX(id);
  const y = getTileY(id);
  return <StyledWall posX={x} posY={y} />;
};

Wall.propTypes = propTypes;
Wall.defaultProps = defaultProps;

export default Wall;
