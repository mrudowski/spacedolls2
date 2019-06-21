import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@blueprintjs/core';
import {
  INCREMENT,
  increment,
  decrement
} from './brain/reducers/counterActions';

export default function CounterComponent() {
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
    <div>
      <div>
        Counter: {counter.count} {counter.test}
      </div>
      <Button onClick={increment3}>Increment counter</Button>
      <Button onClick={() => dispatch(increment())}>Increment counter</Button>
    </div>
  );
}
