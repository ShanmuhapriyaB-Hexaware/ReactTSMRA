import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from '../../../../store';
import { closeDialog, openDialog } from '../store/slice/dialogSlice';

function ConfirmDialog() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  function showConfirmDialog(title: string) {
    return new Promise<boolean>((resolve) => {
      dispatch(
        openDialog({
          title,
          closeButton: false,
          children: (
            <>
                <DialogTitle id="alert-dialog-title">
                  {title} 
                </DialogTitle>
                <DialogActions>
                  <Button onClick={() => {
                    dispatch(closeDialog());
                    resolve(true);
                  }}>
                    Yes
                  </Button>
                  <Button onClick={() => {
                    dispatch(closeDialog());
                    resolve(true);
                  }} autoFocus>
                    No
                  </Button>
                </DialogActions>
            </>
          )
        })
      )
    })
  }
}

export default ConfirmDialog;