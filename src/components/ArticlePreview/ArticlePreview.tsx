import { ArticlesType } from "@/types";
import React, { useState, useMemo } from "react";
import { Box } from "@mantine/core";
import { TextInput } from "@mantine/core";
import ArticlesLists from "./ArticlesLists";

type ArticlePreviewProps = {
  initialArticles: ArticlesType[];
};

const ArticlePreview = ({ initialArticles }: ArticlePreviewProps) => {
  const [articles, setArticles] = useState(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [articles, searchQuery]
  );

  return (
    <Box component="section">
      <TextInput
        placeholder="Type here.."
        label="Search article by title."
        sx={{ width: "50%", margin: "1rem 0" }}
        radius="md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ArticlesLists
        filteredArticles={filteredArticles}
        articles={articles}
        setArticles={setArticles}
      />
    </Box>
  );
};

export default ArticlePreview;
