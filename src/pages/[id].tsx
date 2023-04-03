import { ArticlesType } from "@/types";
import { Box, Flex, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import moment from "moment";
import Comments from "@/components/ArticlePreview/Comments";

export async function getServerSideProps({ params }: any) {
  const articleRes = await fetch(
    `https://62d5368fd4406e5235558a46.mockapi.io/articles/${params.id}`
  );
  return {
    props: {
      article: await articleRes.json(),
    },
  };
}

const dummyImg =
  "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80";

const ArticleDetail = ({ article }: { article: ArticlesType }) => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <Flex
        sx={{ backgroundColor: "white", padding: "1rem" }}
        gap={40}
        direction={{ base: "column", md: "row" }}
      >
        <Image
          src={article.image}
          alt={`article-${article.title}-image`}
          width={280}
          height={280}
        />

        <Flex gap={10} direction="column">
          <Title order={1}>{article.title.toUpperCase()}</Title>
          <Text fz="md">{article.content}</Text>
          <Text fz="sm" fw={700}>
            {moment(article.createdAt).format("LL")}
          </Text>
          <Text fs="italic" fw={500} fz="sm">
            - {article.createBy} -
          </Text>
        </Flex>
      </Flex>

      <Comments article={article} />
    </Box>
  );
};

export default ArticleDetail;
