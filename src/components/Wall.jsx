import React from 'react';
import StyledWall from '../styled/Wall';
import { getXYFromId } from '../utils/tile';
import StyledDoll from "../styled/Doll";

const Wall = ({ data, tileId }) => {
  const {x, y} = getXYFromId(tileId);
  return <StyledWall $x={x} $y={y}><span>{data.hp}</span></StyledWall>;
};

const Doll = ({ data, tileId, selected }) => {
  const {x, y} = getXYFromId(tileId);
  return (
    <StyledDoll $x={x} $y={y} $team={data.team} $selected={selected}>
      {data.hp}
    </StyledDoll>
  );
};

export default Wall;
