import React from 'react';
import PageLayout from "../components/layout/PageLayout.js";
import { Container, Paper, Typography } from "@mui/material";

const HomePage = () => {
  const articles = [{
    title: 'title1'
  }, {
    title: 'title2'
  }, {
    title: 'title3'
  }]

  return (
    <PageLayout>
      {articles.map((article) =>
        <Container key={article.title}>
          <Paper elevation={3} className="p-5 mt-5">
            <Typography variant="h4">{article.title}</Typography>
            <div className="h-[600px] overflow-y-auto">
              {/* Content */}
            </div>
          </Paper>
        </Container>)}
    </PageLayout>

  );
};

export default HomePage;
