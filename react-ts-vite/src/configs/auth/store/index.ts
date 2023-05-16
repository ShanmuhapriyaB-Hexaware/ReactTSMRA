import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth.slice';

const reducer = combineReducers({
  auth: authSlice,
});

export default reducer;
