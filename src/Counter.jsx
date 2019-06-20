import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@blueprintjs/core';

const CounterComponent = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <div>Counter: {counter}</div>
      <Button intent="success" onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment counter
      </Button>
    </div>
  );
};

export default CounterComponent;
