import { ArticlesType } from "@/types";
import { Box } from "@mantine/core";
import React from "react";
import Comments from "@/components/ArticlePreview/Comments";
import Detail from "@/components/ArticlePreview/Detail";

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

const ArticleDetail = ({ article }: { article: ArticlesType }) => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <Detail article={article} />
      <Comments article={article} />
    </Box>
  );
};

export default ArticleDetail;
