import React from 'react';
import Styled from '../styled/TileInfo';
import * as tilesDef from "../utils/tileDef";
import * as tileUtil from "../utils/tile";

const getOccupiedBy = tile => {
  const tileDM = tileUtil.getDataModel(tile);
  const elements = [];

  // TODO utils
  // TODO better
  if (tileDM.hasWall()) elements.push(`${tilesDef.getTitle(tilesDef.WALL)} (hp: ${tile.wall.hp})`);
  if (tileDM.hasDoll()) elements.push('doll');
  return elements.join(', ') || 'nothing';
};

const TileInfo = ({ tile }) => {
  console.log('TileInfo');

  if (tile) {
    return (
      <Styled>
        <h4>Selected tile</h4>
        tileId: {tile.id}
        <br />
        occupiedBy/content: {getOccupiedBy(tile)}
      </Styled>
    );
  }

  return (
    <Styled>
      <h4>Selected tile</h4>
      no tile selected
    </Styled>
  );
};

export default TileInfo;
