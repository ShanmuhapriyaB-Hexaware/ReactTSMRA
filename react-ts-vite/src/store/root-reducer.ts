import { combineReducers } from '@reduxjs/toolkit';
import homeSlice from '../main/home/store';
import authSlice from '../configs/auth/store';
import themeSlice from '../theme/layout/store';

const rootReducer = combineReducers({
    homeSlice,
    authSlice,
    themeSlice,
});

export default rootReducer;
