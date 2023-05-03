import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';


const RadioButtonComponent = (props: any) => {

    const controlsData = props.items.map((data: any) => ({
        label: data[props.itemLabel],
        value: data[props.itemValue],
        ...data,
      }));
    return (

   <FormControl>
        <FormLabel >{props.groupLabel}
            <RadioGroup  value={props.value}
        onChange={props.onChange} defaultValue={props.defaultValue} name="radio-buttons-group">
    {controlsData.map((x: any, index: number)=>{
          return  <FormControlLabel value={x.value} 
          control={<Radio size={props.size} color={props.color}/>}
          label={x.label} 
          key={index}/> 
    })}
            </RadioGroup>

</FormLabel>
            </FormControl>)}

export default RadioButtonComponent;
