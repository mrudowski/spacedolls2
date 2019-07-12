import { createSlice } from 'redux-starter-kit';

// trying https://github.com/reduxjs/redux-starter-kit

const level = createSlice({
  initialState: {
    currentLevelId: null,
    selectedTileId: null
  },
  reducers: {
    changeLevel(state, action) {
      state.currentLevelId = action.payload;
    },
    selectTile(state, action) {
      state.selectedTileId = action.payload;
    }
  }
});

export default level;
