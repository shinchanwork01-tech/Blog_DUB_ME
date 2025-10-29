import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import HorizontalPostCard from '../HorizontalPostCard/HorizontalPostCard';

function PostFeed({ posts, showTitle = true }) { 
  const [visiblePosts, setVisiblePosts] = useState(5);

  useEffect(() => {
    setVisiblePosts(5);
  }, [posts]);

  const handleLoadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

  // 1. The outer Box is removed. The component now adapts to its parent's width.
  //    The parent will be responsible for background color, width, and padding.
  return (
    <>
      {showTitle && (
        <>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ fontWeight: 'bold', color: 'black' }}
          >
            Latest Posts
          </Typography>

          <Divider sx={{ 
            borderColor: 'black',
            borderBottomWidth: 5,
            marginTop: '.1rem',
            marginBottom: '3rem'
          }} />
        </>
      )}

      {posts.slice(0, visiblePosts).map(post => (
        <HorizontalPostCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          date={post.date}
          description={post.description}
          image={post.image}
        />
      ))}

      {visiblePosts < posts.length && (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button variant="contained" onClick={handleLoadMore}  sx={{ fontSize: '1.3rem' }}>
            Load More
          </Button>
        </Box>
      )}
    </>
  );
}

export default PostFeed;