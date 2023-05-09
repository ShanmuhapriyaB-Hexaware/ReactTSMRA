import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './slices/home.slice';

const reducer = combineReducers({
  home: homeReducer,
});

export default reducer;
