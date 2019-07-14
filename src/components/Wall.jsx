import React from 'react';
import StyledWall from '../styled/Wall';
import { getTileXFromId, getTileYFromId } from '../utils/tile';

const Wall = ({ tileId }) => {
  const x = getTileXFromId(tileId);
  const y = getTileYFromId(tileId);
  return <StyledWall $x={x} $y={y} />;
};

export default Wall;
