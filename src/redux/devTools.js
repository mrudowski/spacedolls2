import { createSlice, createSelector } from 'redux-starter-kit';
import board from './board';
import * as tileUtil from '../utils/tile';

export const PAINT = 'PAINT';

const devTools = createSlice({
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
	}
});

// selectors

const getActiveAction = createSelector(['devTools.activeAction']);

devTools.selectors = {
	getActiveAction,
};

// effects


export default devTools;
