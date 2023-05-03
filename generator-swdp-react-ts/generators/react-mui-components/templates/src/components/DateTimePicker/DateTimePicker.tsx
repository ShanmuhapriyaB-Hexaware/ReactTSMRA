import { LocalizationProvider, TimePicker, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';

const DateTimePickerReact = (props: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {(props.type == 'datetime') 
        ?<DateTimePicker {...props} />
        : (props.type == 'time') 
        ? <TimePicker {...props} /> 
        : <DatePicker {...props} />}
    </LocalizationProvider>
  )
};

export default DateTimePickerReact;