import React from 'react';
import StyledDoll from '../styled/Doll';
import { getXYFromId } from '../utils/tile';

const Doll = ({ data, tileId, selected }) => {
  const {x, y} = getXYFromId(tileId);
  return (
    <StyledDoll $x={x} $y={y} $team={data.team} $selected={selected}>
      {data.hp}
    </StyledDoll>
  );
};

export default Doll;
