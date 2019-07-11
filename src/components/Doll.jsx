import React from 'react';
import StyledDoll from '../styled/Doll';
import { getTileXFromId, getTileYFromId } from '../brain/utils';

const Doll = ({ tileId, team }) => {
  const x = getTileXFromId(tileId);
  const y = getTileYFromId(tileId);
  return <StyledDoll $x={x} $y={y} $team={team}  />;
};

export default Doll;