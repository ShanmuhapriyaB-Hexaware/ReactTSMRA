import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckboxComponent = (props: any) => {
  return (
<><FormControlLabel
      control={<Checkbox 
        {...props} 
        onChange={props.onChange} inputProps={props.inputProps}
        checked={props.checked}/>} 
      label={props.label} />
</>
  )}


export default CheckboxComponent;
