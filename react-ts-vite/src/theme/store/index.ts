import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './slice/theme.slice';

const reducer = combineReducers({
  theme: themeReducer,
});

export default reducer;
