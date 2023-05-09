import { combineReducers } from '@reduxjs/toolkit';
import homeSlice from '../main/home/store';

const rootReducer = combineReducers({
    homeSlice
});

export default rootReducer;
