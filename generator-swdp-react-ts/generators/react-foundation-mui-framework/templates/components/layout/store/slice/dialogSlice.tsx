import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropsWithChildren } from 'react';

type InitialDialogState = {
  open?: boolean;
  title: string;
  fullScreen?: boolean;
  closeButton?: boolean;
} & PropsWithChildren;

const initialState: InitialDialogState = {
  open: false,
  title: '',
  fullScreen: false,
  closeButton: true,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<InitialDialogState>) => {
      state.open = true;
      state.children = action.payload.children;
      state.title = action.payload.title;
      state.fullScreen = action.payload.fullScreen ? true : false;
      state.closeButton = action.payload.closeButton ?? true;
    },
    closeDialog: (state) => {
      state.open = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
