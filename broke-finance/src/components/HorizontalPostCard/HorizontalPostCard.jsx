// In broke-finance/src/components/HorizontalPostCard/HorizontalPostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

function HorizontalPostCard({ title, date, description, image, slug }) { // 2. Add slug here
  return (
    // 3. Wrap the Card in a Link component (target="_blank" removed)
    <Link to={`/post/${slug}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ 
        display: 'flex', 
        width: '100%', 
        borderRadius: 3, 
        mb: 4, 
        transition: 'box-shadow 0.3s', 
        '&:hover': { boxShadow: 6 },
        overflow: 'hidden' 
      }}>
        
        {/* The rest of your Card component remains exactly the same */}
        <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            flexGrow: 1,
            justifyContent: 'space-between',
            paddingBottom: '0rem',
            '&:last-child': {
               paddingBottom: '.5rem' 
            }
          }}>
            <Typography 
              component="h2" 
              variant="h4" 
              sx={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                color: 'black'
              }}
            >
              {title}
            </Typography>

            <Typography 
              variant="body2" 
              sx={{
                fontSize: '1rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2', 
                WebkitBoxOrient: 'vertical',
                color: 'black'
              }}
            >
              {description}
            </Typography>

            <Typography 
              variant="subtitle2" 
              sx={{ color: 'black' }}
            >
              {date}
            </Typography>
          </CardContent>
        </Box>

        <CardMedia
          component="img"
          sx={{ 
            width: '40%',
            aspectRatio: '16 / 9',
            objectFit: 'cover'
          }}
          image={image}
          alt={title}
        />
      </Card>
    </Link>
  );
}

export default HorizontalPostCard;