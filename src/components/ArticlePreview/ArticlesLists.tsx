import { ArticlesType } from "@/types";
import { Box, Button, Card, Flex, Grid, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import ButtonShow from "../Buttons/ButtonShow";
import Link from "next/link";
import axios from "axios";

type ArticlesListProps = {
  filteredArticles: ArticlesType[];
  articles: ArticlesType[];
  setArticles: React.Dispatch<React.SetStateAction<ArticlesType[]>>;
  searchQuery:string
};

const ArticlesLists = ({
  filteredArticles,
  articles,
  setArticles,
  searchQuery
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
      const { data } = await axios(
        `https://62d5368fd4406e5235558a46.mockapi.io/articles?page=${nextPage}&limit=${limit}`
      );

      setArticles((prevArticle) => [...prevArticle, ...data]);
      setCurrentPage(nextPage);
    }
    setLoading(false);
  }

  async function handleShowLess() {
    setArticles((prevArticle) => prevArticle.slice(0, articles.length - limit));
    setCurrentPage(currentPage - 1);
  }

  return (
    <Box>
      <Title order={2}>Article preview lists</Title>
      <Flex direction="column" gap="lg" justify="center" align="center">
        <Flex direction="column" gap="lg">
          <Grid gutter={10} columns={4} grow>
            {filteredArticles.map((article) => (
              <Grid.Col sm={2} key={article.id}>
                <Card shadow="sm" padding="lg" radius="md">
                  <Text weight={500}>{article.title}</Text>

                  <Text size="sm" color="dimmed">
                    {article.previewContent}
                  </Text>

                  <Button
                    variant="light"
                    color="violet"
                    mt="md"
                    radius="md"
                    component={Link}
                    href={`/${article.id}`}
                  >
                    See Details
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>

          {!searchQuery && (
            <Flex gap="lg">
              {!loading && filteredArticles.length > 10 && (
                <ButtonShow onClick={handleShowLess} color="red">
                  Show Less
                </ButtonShow>
              )}
              {!loading && filteredArticles.length < total && (
                <ButtonShow
                  onClick={handleShowMore}
                  disabled={currentPage === maxPage}
                  color="violet"
                >
                  View More
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
