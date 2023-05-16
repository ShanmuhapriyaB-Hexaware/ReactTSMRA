import { combineReducers } from '@reduxjs/toolkit';
import homeSlice from '../main/home/store';
import layoutSlice from '../theme/layout/store';
import commonSlice from '../common/store';

const rootReducer = combineReducers({
    homeSlice,
    layoutSlice,
    commonSlice,
});

export default rootReducer;
