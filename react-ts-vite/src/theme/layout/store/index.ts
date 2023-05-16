import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './slices/theme.slice';

const reducer = combineReducers({
  theme: themeReducer,
});

export default reducer;
