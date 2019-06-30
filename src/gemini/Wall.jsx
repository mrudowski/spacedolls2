import React from 'react';
import PropTypes from 'prop-types';
import StyledWall from './styled/Wall';

const propTypes = {};

const defaultProps = {};

const getX = id => id.split(',')[0];
const getY = id => id.split(',')[1];

const Wall = ({ id }) => {
  const x = getX(id);
  const y = getY(id);
  return <StyledWall posX={x} posY={y} />;
};

Wall.propTypes = propTypes;
Wall.defaultProps = defaultProps;

export default Wall;
