import { combineReducers } from '@reduxjs/toolkit';
import dialog from './slice/dialogSlice';
import theme from './slice/themeSlice';

const reducer = combineReducers({
  dialog,
  theme
});

export default reducer;
