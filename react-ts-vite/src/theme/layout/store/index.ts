import { combineReducers } from '@reduxjs/toolkit';
import layoutReducer from './slice/layout.slice';

const reducer = combineReducers({
  layout: layoutReducer,
});

export default reducer;
