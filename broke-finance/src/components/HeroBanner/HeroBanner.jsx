import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';
import heroImage from '../../assets/Hero_Banner.png';
import { Box, TextField, InputAdornment, Button, Paper, List, ListItemButton, ListItemText } from '@mui/material';
import postList from '../../master-list.json';

// Custom SVG component for the rainbow search icon
const RainbowSearchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6A5ACD" />
        <stop offset="20%" stopColor="#00BFFF" />
        <stop offset="40%" stopColor="#32CD32" />
        <stop offset="60%" stopColor="#FFD700" />
        <stop offset="80%" stopColor="#FF4500" />
        <stop offset="100%" stopColor="#DC143C" />
      </linearGradient>
    </defs>
    <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5S5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14Z" fill="url(#rainbow-gradient)" />
  </svg>
);

function HeroBanner({ searchInput, onSearchChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const heroRef = useRef(null);
  const searchWrapperRef = useRef(null);
  const [dropdownMaxHeight, setDropdownMaxHeight] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const calculateMaxHeight = useCallback(() => {
    if (heroRef.current && searchWrapperRef.current) {
      const heroRect = heroRef.current.getBoundingClientRect();
      const searchRect = searchWrapperRef.current.getBoundingClientRect();
      const availableSpace = heroRect.bottom - searchRect.bottom;
      const margin = 20; // The "smidge" of space at the bottom
      setDropdownMaxHeight(availableSpace - margin);
    }
  }, []);

  useEffect(() => {
    calculateMaxHeight(); // Calculate on initial render
    window.addEventListener('resize', calculateMaxHeight);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', calculateMaxHeight);
    };
  }, [calculateMaxHeight]);


  useEffect(() => {
    if (searchInput.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = postList.filter(post =>
      post.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [searchInput]);
  
  const handleFocus = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsFocused(true);
  };

  const handleSearchSubmit = () => {
    if (searchInput.trim() !== '') {
      window.open(`/search?q=${searchInput}`, '_blank');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  return (
    <div className="hero-container" ref={heroRef}>
      <img src={heroImage} alt="Finance banner" className="hero-image" />
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <Box sx={{ width: '50%', position: 'relative' }} ref={searchWrapperRef}>
          <TextField
            variant="outlined"
            placeholder="Search for a post by title..."
            value={searchInput}
            onChange={onSearchChange}
            onKeyDown={handleKeyPress}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            fullWidth
            inputRef={inputRef}
            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white', borderRadius: '50px', paddingRight: '4px', '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: 'transparent' }, '&.Mui-focused fieldset': { borderColor: 'transparent' } } }}
            InputProps={{
              startAdornment: ( <InputAdornment position="start" sx={{ pl: 1 }}> <RainbowSearchIcon /> </InputAdornment> ),
              endAdornment: ( <InputAdornment position="end"> <Button variant="contained" onClick={handleSearchSubmit} sx={{ borderRadius: '50px', height: '50px', boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}>GO</Button> </InputAdornment> ),
            }}
          />
          {isFocused && suggestions.length > 0 && (
            <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1, mt: 1, maxHeight: dropdownMaxHeight > 0 ? `${dropdownMaxHeight}px` : 'auto', overflowY: 'auto', paddingBottom: '8px' }}>
              <List>
                {suggestions.map(post => (
                  <ListItemButton 
                    component={Link} 
                    to={`/post/${post.slug}`} 
                    target="_blank" 
                    key={post.slug}
                    sx={{ textDecoration: 'none' }}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      if(inputRef.current) {
                        inputRef.current.blur();
                      }
                    }}
                  >
                    <ListItemText primary={post.title} primaryTypographyProps={{ style: { color: 'black' } }} />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default HeroBanner;