import { combineReducers } from '@reduxjs/toolkit';
import dialogReducer from './slices/dialog.slice';
import navigationReducer from './slices/navigation.slice';

const reducer = combineReducers({
  dialog: dialogReducer,
  navigation: navigationReducer,
});

export default reducer;
