import { combineReducers } from '@reduxjs/toolkit';
import navigationReducer from './slices/navigation.slice';

const reducer = combineReducers({
  navigation: navigationReducer,
});

export default reducer;
