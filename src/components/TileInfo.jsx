import React from 'react';
import Styled from '../styled/TileInfo';

const getOccupiedBy = tile => {
  const elements = [];
  if (tile.wall) elements.push('wall');
  if (tile.doll) elements.push('doll');
  return elements.join(', ') || 'nothing';
};

const TileInfo = ({ tile }) => {
  console.log('TileInfo');

  if (tile) {
    return (
      <Styled>
        <h4>Selected</h4>
        tileId: {tile.id}
        <br />
        occupiedBy/content: {getOccupiedBy(tile)}
      </Styled>
    );
  } else {
    return (
      <Styled>
        <h4>Selected</h4>
        no tile selected
      </Styled>
    );
  }
};

export default TileInfo;
