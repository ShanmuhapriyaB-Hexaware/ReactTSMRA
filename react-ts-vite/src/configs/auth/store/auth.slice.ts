import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  user: any;
  configname: string | undefined;
};

const initialState: InitialStateType = {
  user: {},
  configname: undefined
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
    },
    setConfigName: (state, action: PayloadAction<any>) => {
        state.configname = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
  },
});

export const { setAuth, setConfigName } = authSlice.actions;

export default authSlice.reducer;
