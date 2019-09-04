import React from 'react';
import { useSelector } from 'react-redux';
import StyledDollInfo from '../styled/DollInfo';
import {getDollMetaData} from '../utils/doll';
import dolls from '../redux/dolls';

const DollInfo = () => {
  const data = useSelector(dolls.selectors.getSelectedDoll);

  console.log('DollInfo');

  if (!data) {
    return <StyledDollInfo>no doll selected / active</StyledDollInfo>;
  }

  const metaData = getDollMetaData(data.id);
  return (
    <StyledDollInfo>
      <h4>Selected / active doll</h4>
      {data.meta.codeName} ({metaData.race}){data.team}<br/>
      HP: {data.hp}<br/>
      MoveRange: {data.meta.stats.move}<br/>
      AttackRange: {data.meta.stats.attackRange}<br/>
      AttackStrength: {data.meta.stats.attackStrange}<br/>
      FieldOfDestruction: {metaData.stats.FOD}<br/>
    </StyledDollInfo>
  );
};

export default DollInfo;
