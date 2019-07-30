import { INCREMENT } from './counterActions';

const initialState = {
  count: 0,
  test: 'me'
};
//counterReducer
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      //return state.count + 1;
      return {
        ...state,
        count: state.count + 1
      };
    // case DECREMENT:
    //   return state.count - 1;
    default:
      return state;
  }
}
