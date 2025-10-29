import { useState } from 'react';
import './App.css'
import HeroBanner from './components/HeroBanner/HeroBanner'
import TopBar from './components/TopBar/TopBar'
import PostFeed from './components/PostFeed/PostFeed'
import Footer from './components/Footer/Footer'
import { Box, CssBaseline } from '@mui/material'
import postList from './master-list.json';

function App() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div>
      <CssBaseline />
      <Box sx={{ position: 'relative' }}>
        <TopBar />
        <HeroBanner 
          searchInput={searchInput}
          onSearchChange={(e) => setSearchInput(e.target.value)}
        />
      </Box>

      {/* 1. Add a wrapper here to control the layout for the main page */}
      <Box sx={{ bgcolor: '#f4f6f8', py: '4rem' }}>
        <Box sx={{ width: '60%', margin: '0 auto' }}>
          <PostFeed posts={postList} />
        </Box>
      </Box>

      <Footer />
    </div>
  )
}

export default App