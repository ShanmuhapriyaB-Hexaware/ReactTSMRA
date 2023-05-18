import { combineReducers } from '@reduxjs/toolkit';
import homeSlice from '../main/home/store';
import authSlice from '../configs/auth/store';
import themeSlice from '../theme/store';
import commonSlice from '../common/store';

const rootReducer = combineReducers({
    homeSlice,
    authSlice,
    themeSlice,
    commonSlice
});

export default rootReducer;
