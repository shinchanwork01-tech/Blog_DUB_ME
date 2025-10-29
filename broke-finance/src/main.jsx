import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import PostPage from './components/PostPage/PostPage.jsx';
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage.jsx'; // 1. Import the new page
import './index.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto Condensed', 
      'sans-serif',
    ].join(','),
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/post/:slug",
    element: <PostPage />,
  },
  {
    path: "/search", // 2. Add the search results route
    element: <SearchResultsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)