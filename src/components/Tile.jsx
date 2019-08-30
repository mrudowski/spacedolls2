import React from 'react';
import { useDispatch } from 'react-redux';
import StyledTile from '../styled/Tile';
import board from '../redux/board';
// import * as tileUtil from '../utils/tile';

const Tile = ({ id, selected, hasDoll }) => {
  const dispatch = useDispatch();

  // console.log('Tile');

  return (
    <StyledTile
      // $even={tileUtil.getTileIndex}
      $selected={selected}
      $hasDoll={hasDoll}
      // $dollSelected={}
      onClick={() => dispatch(board.actions.selectTile(id))}
    >
      <div className="coordinates">{id}</div>
      <div className="hover"><span /></div>
    </StyledTile>
  );
};

export default Tile;
