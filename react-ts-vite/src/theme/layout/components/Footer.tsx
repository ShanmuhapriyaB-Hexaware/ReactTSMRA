import * as React from 'react';
import {Box, Grid} from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    // <Grid item xs={4}>
    <Box sx={{ width: 500 }} style={{textAlign: "center", position: 'fixed', bottom: '1rem', right: '20rem'}}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}>
        <p>
          @Hexaware Technologies | All rights reserved{' '}
        </p>
      </BottomNavigation>
    </Box>
    // </Grid>
  );
}

export default Footer;