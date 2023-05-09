import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    data: any
};

const initialState: InitialState = {
    data: []
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default homeSlice.reducer;