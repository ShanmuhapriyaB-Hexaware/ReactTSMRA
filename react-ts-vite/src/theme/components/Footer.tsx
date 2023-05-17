import * as React from 'react';
import { Box } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';

function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100%" }} style={{ display: "flex", alignItems\: "center", position: 'fixed', bottom: 0, }}
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
  );
}

export default Footer;