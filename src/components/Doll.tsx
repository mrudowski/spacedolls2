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
  selected: boolean
}

const Doll:React.FunctionComponent<Props> = ({ data, tileId, selected, ...restProps }) => {
  console.log('restProps',restProps);
  const {x, y} = getXYFromId(tileId);
  return (
    <StyledDoll
        key='doll'
        $x={x}
        $y={y}
        $team={data.team}
        $selected={selected}
        pose={selected ? 'visible' : 'hidden'}
        {...restProps}
    >
      {data.hp}
    </StyledDoll>
  );
};

export default Doll;
