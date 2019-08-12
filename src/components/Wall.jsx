import React from 'react';
import StyledWall from '../styled/Wall';
import { getXYFromId } from '../utils/tile';

const Wall = ({ tileId }) => {
  const {x, y} = getXYFromId(tileId);
  return <StyledWall $x={x} $y={y} />;
};

export default Wall;
