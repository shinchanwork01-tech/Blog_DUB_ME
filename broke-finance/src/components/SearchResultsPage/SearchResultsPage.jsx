import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PostFeed from '../PostFeed/PostFeed';
import Footer from '../Footer/Footer';
import postList from '../../master-list.json';
// 1. Import Divider from Material-UI
import { Box, CssBaseline, Typography, AppBar, Toolbar, Container, Divider } from '@mui/material';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredPosts = postList.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ paddingY: '1rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
              Broke Finance
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f4f6f8', width: '100%', py: '4rem' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Search Results for: "{query}"
          </Typography>

          {/* 2. Add the Divider component here */}
          <Divider sx={{ 
            borderColor: 'black',
            borderBottomWidth: 5,
            marginTop: '.1rem',
            marginBottom: '3rem'
          }} />

          {filteredPosts.length > 0 ? (
            <PostFeed posts={filteredPosts} showTitle={false} />
          ) : (
            <Typography sx={{ mt: 3 }}>
              No posts found matching your search.
            </Typography>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default SearchResultsPage;