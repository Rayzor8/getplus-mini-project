import { ArticlesType } from "@/types";
import React, { useState } from "react";
import ButtonShow from "../Buttons/ButtonShow";
import { Box, Flex, Grid, Title } from "@mantine/core";

type ArticlePreviewProps = {
  initialArticles: ArticlesType[];
};

const ArticlePreview = ({ initialArticles }: ArticlePreviewProps) => {
  const [articles, setArticles] = useState(initialArticles);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;
  const maxPage = 5;

  async function handleShowMore() {
    setLoading(true);
    const nextPage = currentPage + 1;
    if (nextPage <= maxPage) {
      const res = await fetch(
        `https://62d5368fd4406e5235558a46.mockapi.io/articles?page=${nextPage}&limit=${limit}`
      );
      const nextArticles = await res.json();
      setArticles([...articles, ...nextArticles]);
      setCurrentPage(nextPage);
    }
    setLoading(false);
  }

  async function handleShowLess() {
    const newArticles = articles.slice(0, articles.length - limit);
    setArticles(newArticles);
    setCurrentPage(currentPage - 1);
  }

  return (
    <Box component="section">
      <Flex direction="column" justify="center" align="center" gap="lg">
        <Title order={1}>Article preview list</Title>
        <Flex direction="column" gap="lg">
          <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
            {articles.map((article) => (
              <Grid.Col
                span={4}
                key={article.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  padding: "10px",
                }}
              >
                <p>{article.id}</p>
                <h2>{article.title}</h2>
                <p>{article.createBy}</p>
              </Grid.Col>
            ))}
          </Grid>
          <Flex gap="lg">
            {!loading && articles.length > 10 && (
              <ButtonShow onClick={handleShowLess} color="yellow">
                Show Less
              </ButtonShow>
            )}
            {!loading && articles.length < 100 && (
              <ButtonShow
                onClick={handleShowMore}
                disabled={currentPage === maxPage}
                color="green"
              >
                Show More
              </ButtonShow>
            )}
          </Flex>
        </Flex>
        {loading && <p>Loading...</p>}

        {!loading && articles.length >= 100 && <p>No more articles to show</p>}
      </Flex>
    </Box>
  );
};

export default ArticlePreview;
