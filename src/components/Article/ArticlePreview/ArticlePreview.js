import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ArticlePreview = ({ article }) => {
  const { title } = article;
  return (
    <Container key={title}>
      <Paper elevation={3} className="p-5 mt-5">
        <Typography variant="h4">{title}</Typography>
        <div className="h-[600px] overflow-y-auto">{/* Content */}</div>
      </Paper>
    </Container>
  );
};

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticlePreview;
