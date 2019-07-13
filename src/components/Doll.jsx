import React from 'react';
import { useSelector } from 'react-redux';
import StyledDoll from '../styled/Doll';
import { getTileXFromId, getTileYFromId } from '../brain/utils';
import dolls from '../redux/reducers/dolls';

const Doll = ({ id, tileId, team }) => {
  const dollsData = useSelector(dolls.selectors.getDolls);
  const allDollsData = useSelector(dolls.selectors.getAllDolls);
  //const dollData = useSelector(dolls.selectors.getDollById);

console.log('allDollsData',allDollsData);

  const x = getTileXFromId(tileId);
  const y = getTileYFromId(tileId);
  return (
    <StyledDoll $x={x} $y={y} $team={team}>
      {dollsData.byId[id].hp}
    </StyledDoll>
  );
};

export default Doll;
