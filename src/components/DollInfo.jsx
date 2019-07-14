import React from 'react';
import { useSelector } from 'react-redux';
import StyledDollInfo from '../styled/DollInfo';
import {getDollMetaData} from '../utils/doll';
import dolls from '../redux/dolls';

const DollInfo = () => {
  const data = useSelector(dolls.selectors.getSelectedDollData);
  if (data) {
    // alternative better way?
    const metaData = getDollMetaData(data.id);
    return (
      <StyledDollInfo>
        <h4>Selected / active doll</h4>
        {data.meta.codeName} ({metaData.race}){data.team}
      </StyledDollInfo>
    );
  } else {
    return <StyledDollInfo>no doll selected / active</StyledDollInfo>;
  }
};

export default DollInfo;
