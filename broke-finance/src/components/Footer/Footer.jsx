import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        textAlign: 'center', 
        padding: '1rem', // Padding reduced by half
        backgroundColor: 'black' // Background color set to black
      }}
    >
      <Typography variant="body1" sx={{ color: 'white' }}> {/* Text color set to white */}
        @No-Rights received this is running on vibes alone. 💖
      </Typography>
    </Box>
  );
}

export default Footer;