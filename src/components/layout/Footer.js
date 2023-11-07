import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1, textAlign: 'center' }}>
          Sticky Footer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
