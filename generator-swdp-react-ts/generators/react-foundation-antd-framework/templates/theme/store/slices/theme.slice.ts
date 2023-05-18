import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigationItem } from '../../../models/navigation.types';

const initialState = {
  data: [],
};

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => { },
});

export const {
} = themeSlice.actions;

export default themeSlice.reducer;