import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, Container, Divider, AppBar, Toolbar, CardMedia, CircularProgress, Button, IconButton, Snackbar, Alert } from '@mui/material';
import postList from '../../master-list.json';
import Footer from '../Footer/Footer'; 
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function PostPage() {
  const { slug } = useParams();
  const [postContent, setPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const postData = postList.find((post) => post.slug === slug);
  const shareUrl = window.location.href;

  useEffect(() => {
    if (postData) {
      setIsLoading(true);
      setPostContent('');
      
      // THIS IS THE CORRECTED DYNAMIC IMPORT
      // It now uses the 'filebase' and adds the '.md' extension statically.
      import(`../../posts/${postData.filebase}.md`)
        .then(res => fetch(res.default))
        .then(response => response.text())
        .then(text => {
          setPostContent(text);
          setIsLoading(false); 
        })
        .catch(err => {
          console.error("Error fetching post content:", err);
          setIsLoading(false); 
        });
    } else {
      setIsLoading(false);
    }
  }, [slug, postData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setOpenSnackbar(true);
    });
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  if (!postData) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8, p: 2 }}>
        <Typography variant="h1">404</Typography>
        <Typography variant="h5" gutterBottom>Post Not Found</Typography>
        <Typography>The post you are looking for does not exist.</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>Go to Homepage</Button>
      </Box>
    );
  }
  
  const contentWithoutFrontmatter = postContent.split('---').slice(2).join('---');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ paddingY: '1rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
              Broke Finance
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container sx={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>{postData.title}</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ marginY: '1rem' }}>{postData.date}</Typography>
          
          <Box sx={{ my: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TwitterShareButton url={shareUrl} title={postData.title}><IconButton sx={{ backgroundColor: '#000000', '&:hover': { backgroundColor: '#222' } }}><TwitterIcon size={24} round={false} bgStyle={{ fill: 'transparent' }} iconFillColor="white"/></IconButton></TwitterShareButton>
            <FacebookShareButton url={shareUrl} quote={postData.title}><IconButton sx={{ backgroundColor: '#1877F2', '&:hover': { backgroundColor: '#166eab' } }}><FacebookIcon size={24} round={false} bgStyle={{ fill: 'transparent' }} iconFillColor="white"/></IconButton></FacebookShareButton>
            <LinkedinShareButton url={shareUrl} title={postData.title} summary={postData.description}><IconButton sx={{ backgroundColor: '#0A66C2', '&:hover': { backgroundColor: '#095ab1' } }}><LinkedinIcon size={24} round={false} bgStyle={{ fill: 'transparent' }} iconFillColor="white"/></IconButton></LinkedinShareButton>
            <RedditShareButton url={shareUrl} title={postData.title}><IconButton sx={{ backgroundColor: '#FF4500', '&:hover': { backgroundColor: '#e03d00' } }}><RedditIcon size={24} round={false} bgStyle={{ fill: 'transparent' }} iconFillColor="white"/></IconButton></RedditShareButton>
            <IconButton onClick={handleCopy} sx={{ backgroundColor: '#f0f0f0', '&:hover': { backgroundColor: '#e0e0e0' } }}><ContentCopyIcon sx={{ color: 'black', fontSize: '20px' }} /></IconButton>
          </Box>

          <CardMedia component="img" image={postData.image} alt={postData.title} sx={{ width: '100%', maxHeight: '550px', objectFit: 'cover', borderRadius: 2, marginBottom: '2rem' }} />
          <Divider sx={{ marginBottom: '2rem' }}/>
          
          <Box className="post-content">
            <ReactMarkdown
              children={contentWithoutFrontmatter}
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({node, ...props}) => <Typography paragraph sx={{ color: 'black', fontSize: '1.1rem', lineHeight: 1.7 }} {...props} />,
                li: ({node, ...props}) => ( <li style={{ marginBottom: '1rem' }}> <Typography component="span" sx={{ color: 'black', fontSize: '1.1rem', lineHeight: 1.7 }} {...props} /> </li> ),
                strong: ({node, ...props}) => <Typography component="strong" sx={{ fontWeight: 'bold' }} {...props} />
              }}
            />
          </Box>
        </Container>
      </Box>
      <Footer />
      
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PostPage;