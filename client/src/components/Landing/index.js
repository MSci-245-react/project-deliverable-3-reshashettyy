import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Landing
          </Typography>
          <Link
            color="inherit"
            style={{ cursor: 'pointer', marginRight: '20px' }}
            onClick={() => navigate('/Search')}
          >
            Search
          </Link>
          <Link
            color="inherit"
            style={{ cursor: 'pointer', marginRight: '20px' }}
            onClick={() => navigate('/Review')}
          >
            Review
          </Link>
          <Link
            color="inherit"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/MyPage')}
          >
            My Page
          </Link>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="h3" color="inherit" noWrap>
          Welcome to the Movie App Landing Page
        </Typography>
        <Typography variant="h5" color="inherit" noWrap>
          Discover and review your favorite movies!
        </Typography>
      </div>

      {/* You can add more content for the Landing page here */}

    </div>
  );
};

export default Landing;
