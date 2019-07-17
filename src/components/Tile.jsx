import React from 'react';
import { useDispatch } from 'react-redux';
import StyledTile from '../styled/Tile';
import board from '../redux/board';

const Tile = ({ id, selected }) => {
  const dispatch = useDispatch();

  // console.log('Tile');

  return (
    <StyledTile
      onClick={() => dispatch(board.actions.selectTile(id))}
      selected={selected}
    >
      <div className="coordinates">{id}</div>
    </StyledTile>
  );
};

export default Tile;
