import React from 'react';
import StyledDoll from '../styled/Doll';
import { getTileXFromId, getTileYFromId } from '../brain/utils';
// import dolls from '../redux/dolls';

const Doll = ({ data, tileId }) => {
  // const dollsData = useSelector(dolls.selectors.getDolls);
  //  const allDollsData = useSelector(dolls.selectors.getAllDolls);
  // Using props via closure to determine what to extract
  // const dollData = useSelector(store => store.dolls.byId[id]);
  // const dollData2 = useSelector(dolls.selectors.getDollById(id));
  // const getDollTeam = useSelector(dolls.selectors.getDollTeam(id));

  const x = getTileXFromId(tileId);
  const y = getTileYFromId(tileId);
  return (
    <StyledDoll $x={x} $y={y} $team={data.team}>
      {data.hp}
    </StyledDoll>
  );
};

export default Doll;
