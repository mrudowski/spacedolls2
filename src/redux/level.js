import { createSlice } from 'redux-starter-kit';

// trying https://github.com/reduxjs/redux-starter-kit

const level = createSlice({
  slice: 'level',
  initialState: {
    currentLevelId: null
  },
  reducers: {
    changeLevel: (state, action) => {
      // You can "mutate" the state in a reducer, thanks to Immer
      state.currentLevelId = action.payload;
    }
  }
});

export default level;
