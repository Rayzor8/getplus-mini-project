import { ArticlesType } from "@/types";
import { Box, Button, Card, Flex, Grid, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import ButtonShow from "../Buttons/ButtonShow";

type ArticlesListProps = {
  filteredArticles: ArticlesType[];
  articles: ArticlesType[];
  setArticles: React.Dispatch<React.SetStateAction<ArticlesType[]>>;
};

const ArticlesLists = ({
  filteredArticles,
  articles,
  setArticles,
}: ArticlesListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;
  const maxPage = 5;
  const total = limit * maxPage;

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
    <Box>
      <Title order={1}>Article preview lists</Title>
      <Flex direction="column" gap="lg" justify="center" align="center">
        <Flex direction="column" gap="lg">
          <Grid gutter={5} columns={4}>
            {filteredArticles.map((article) => (
              <Grid.Col
                sm={2}
                xl={1}
                key={article.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  {/* <Card.Section>
                <MantineImage
                  src={article.image}
                  height={160}
                  alt={`article-img-${article.title}`}
                />
              </Card.Section> */}

                  <Text weight={500}>{article.title}</Text>

                  <Text size="sm" color="dimmed">
                    {article.previewContent}
                  </Text>

                  <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                  >
                    See Details
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>

          {filteredArticles.length > 0 && (
            <Flex gap="lg">
              {!loading && filteredArticles.length > 10 && (
                <ButtonShow onClick={handleShowLess} color="orange">
                  Show Less
                </ButtonShow>
              )}
              {!loading && filteredArticles.length < total && (
                <ButtonShow
                  onClick={handleShowMore}
                  disabled={currentPage === maxPage}
                  color="teal"
                >
                  Show More
                </ButtonShow>
              )}
            </Flex>
          )}
        </Flex>
        {loading && <p>Loading...</p>}

        {!loading && filteredArticles.length >= total && (
          <p>No more articles to show</p>
        )}
      </Flex>
    </Box>
  );
};

export default ArticlesLists;
