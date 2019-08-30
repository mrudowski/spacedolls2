import React from 'react';
import StyledDoll from '../styled/Doll';
import { getXYFromId } from '../utils/tile';

interface DollData {
  team: string;
  hp: number;
}

interface Props {
  data: DollData;
  tileId: string;
  selected: boolean;
}

const Doll:React.FunctionComponent<Props> = ({ data, tileId, selected }) => {
  const {x, y} = getXYFromId(tileId);
  return (
    <StyledDoll $x={x} $y={y} $team={data.team} $selected={selected}>
      {data.hp}
    </StyledDoll>
  );
};

export default Doll;
