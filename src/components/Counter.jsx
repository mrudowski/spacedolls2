import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  // INCREMENT,
  increment,
  // decrement
} from '../redux/reducers/counterActions';

const StyledCounter = styled.div`
  color: deeppink;
  .counter {
    margin-bottom: 10px;
  }
`;

const StyledHr = styled.hr`
  border-color: rgba(255, 255, 255, 0.25);
  margin: 10px 0;
`;

export default function CounterComponent({ className }) {
  const counter = useSelector(state => state.counter);
  // many values???
  // const { counter } = useSelector(
  //   state => ({ counter: state.counter.count })
  // );

  const dispatch = useDispatch();

  const increment3 = () => {
    //dispatch({ type: INCREMENT });
    //dispatch({ type: TOGGLE, payload: 'My payload' })
    dispatch(increment());
  };

  return (
    <StyledCounter>
      <div className="counter">
        Counter: {counter.count} {counter.test}
      </div>
      <StyledHr />
      <button onClick={increment3}>Increment counter</button>
      <button onClick={() => dispatch(increment())}>Increment counter</button>
    </StyledCounter>
  );
}
