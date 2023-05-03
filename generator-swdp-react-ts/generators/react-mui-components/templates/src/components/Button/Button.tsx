import React from "react";
import Button from '@mui/material/Button';
import Cross from '../../icons/cross-circle.svg'
import Tooltip from '@mui/material/Tooltip';

const ButtonComponent = (props: any) => {
  
  let displayStartIcon, displayEndIcon 
  if(props.startIcon !== undefined){
    ( React.isValidElement(props.startIcon) !== false)
      ? displayStartIcon = props.startIcon
      :displayStartIcon =<Tooltip title='No Icon'><Cross width={20} height={20}/></Tooltip>
  }

  if(props.endIcon !== undefined){
    ( React.isValidElement(props.endIcon) !== false)
      ? displayEndIcon = props.endIcon
      :displayEndIcon = <Tooltip title='No Icon'><Cross width={20} height={20}/></Tooltip>
  }

  return <Button {...props} startIcon={displayStartIcon} endIcon={displayEndIcon}>
            {props.label}
        </Button>;
};

export default ButtonComponent;