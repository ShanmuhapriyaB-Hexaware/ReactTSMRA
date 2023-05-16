import { combineReducers } from '@reduxjs/toolkit';
import dialogReducer from './slices/dialog.slice';

const reducer = combineReducers({
  dialog: dialogReducer,
});

export default reducer;
