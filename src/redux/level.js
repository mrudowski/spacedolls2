import { createSlice } from 'redux-starter-kit';

// trying https://github.com/reduxjs/redux-starter-kit

const level = createSlice({
  slice: 'level',
  initialState: {
    currentLevelId: null,
    selectedTileId: null
  },
  reducers: {
    changeLevel: (state, action) => {
      // You can "mutate" the state in a reducer, thanks to Immer
      state.currentLevelId = action.payload;
    },
    selectTile: (state, action) => {
      state.selectedTileId = action.payload;
    }
  }
});

export default level;
