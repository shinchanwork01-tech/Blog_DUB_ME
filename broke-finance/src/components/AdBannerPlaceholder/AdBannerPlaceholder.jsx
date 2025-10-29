import React from 'react';
import { Box, Typography } from '@mui/material';

function AdBannerPlaceholder() {
  return (
    // This is just a Box, not a Card
    <Box sx={{
      width: '60%', // Same width as posts for alignment
      mb: 4,        // Same bottom margin for spacing
      aspectRatio: '8 / 1', // A typical banner ad ratio (wide and short)
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      border: '2px dashed #ccc',
      borderRadius: 3
    }}>
      <Typography variant="h6" color="text.secondary">
        Ad Banner
      </Typography>
    </Box>
  );
}

export default AdBannerPlaceholder;