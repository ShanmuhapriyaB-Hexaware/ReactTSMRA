import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ColorModes = 'dark' | 'light';

type InitialStateType = {
    mode: ColorModes;
    data: any
};

const initialState : InitialStateType = {
    mode: 'dark',
    data: [],
};

const themeSlice = createSlice({
    name: 'themeSlice',
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
    extraReducers: (builder) => { },
});

export const {
    toggleColorMode,
    setColorTheme
} = themeSlice.actions;

export default themeSlice.reducer;