import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function TopBar() {
  return (
    <AppBar position="absolute" elevation={0} sx={{ backgroundColor: 'transparent', zIndex: 10 }} >
      <Toolbar disableGutters sx={{ paddingY: '2rem', paddingX: '3rem' }}>
        <Typography
          variant="h3"
          component="div"
          sx={{ fontWeight: 'bold', color: 'white' }}
        >
          Broke Finance
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;