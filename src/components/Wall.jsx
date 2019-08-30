import React from 'react';
import { getXYFromId } from '../utils/tile';
import StyledWall from '../styled/Wall';

const Wall = ({ data, tileId }) => {
  const {x, y} = getXYFromId(tileId);
  return <StyledWall $x={x} $y={y}><span>{data.hp}</span></StyledWall>;
};

export default Wall;
