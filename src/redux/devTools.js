import { createSlice, createSelector } from 'redux-starter-kit';
export const PAINT = 'PAINT';

const actions = createSlice({
  slice: 'devTools',
  initialState: {
    activeAction: null
  },
  reducers: {
  	toggleAction: (state, action) => {
  		const actionName = action.payload;
			if (state.activeAction === actionName) {
				state.activeAction = null;
			} else {
				state.activeAction = actionName;
			}
		},
			// TODO utils
			// const tile = state.selectedTileId && state.tiles[state.selectedTileId];
			// if (tile && tile.wall) {
			// 	tile.wall = false;
			// } else if (tile && !tile.dollId) {
			// 	tile.wall = true;
			// }
	}
});

// selectors

const getActiveAction = createSelector(['devTools.activeAction']);

actions.selectors = {
	getActiveAction,
};

// effects

export default actions;
