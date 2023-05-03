import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';

const CheckboxGroupComponent = (props: any) => {
  return (
    <FormControl {...props} >

    <FormLabel >{props.grouplabel}</FormLabel>

    <FormGroup>
      {props.children}

    </FormGroup>

    </FormControl>
  );
}
          
export default CheckboxGroupComponent;