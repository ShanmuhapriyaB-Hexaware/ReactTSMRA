import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ColorModes = 'dark' | 'light';

type InitialStateType = {
  mode: ColorModes;
};

const initialState: InitialStateType = {
  mode: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleColorMode: (state) => {
      if (state.mode === 'light') state.mode = 'dark';
      else state.mode = 'light';
    },
    setColorTheme: (state, action: PayloadAction<ColorModes>) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleColorMode } = themeSlice.actions;

export default themeSlice.reducer;
