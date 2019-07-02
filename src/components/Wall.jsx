import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import StyledWall from '../styled/Wall';
import wallStyle from '../styled/wallStyle';

const propTypes = {};

const defaultProps = {};

const Wall = ({ id }) => {
  return <div />;
};

Wall.propTypes = propTypes;
Wall.defaultProps = defaultProps;

const StyledWall = styled(Wall)(wallStyle);

export default StyledWall;
