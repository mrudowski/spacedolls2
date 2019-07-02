import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import StyledTile from '../styled/Tile';
import { selectTile } from '../redux/actions';

// StyledComponent inside Component
// - strapi way, the only, best way?
// - passing props is so much as defining classNames

// but here we've done it up side down...
// - className props needed

const propTypes = {};

const defaultProps = {};

const Tile = ({ id, selected, className }) => {
  const dispatch = useDispatch();

  // TODO styled component as wrapper...

  return (
    <div onClick={() => dispatch(selectTile(id))} className={className}>
      <div className="coordinates">{id}</div>
    </div>
  );
};

Tile.propTypes = propTypes;
Tile.defaultProps = defaultProps;

export default Tile;
