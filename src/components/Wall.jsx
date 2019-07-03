import React from 'react';
import PropTypes from 'prop-types';
import StyledWall from '../styled/Wall';
import { getTileXFromId, getTileYFromId } from '../brain/utils';

const propTypes = {};

const defaultProps = {};

const Wall = ({ tileId }) => {
  const x = getTileXFromId(tileId);
  const y = getTileYFromId(tileId);
  return <StyledWall $x={x} $y={y} />;
};

Wall.propTypes = propTypes;
Wall.defaultProps = defaultProps;

export default Wall;
