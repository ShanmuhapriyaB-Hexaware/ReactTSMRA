import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

type IProps = {
  text: string;
}

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

function ListDivider({text}: IProps) {
  return (
    <>
      <Divider>{text}</Divider>
    </>
  );
}

export default ListDivider;