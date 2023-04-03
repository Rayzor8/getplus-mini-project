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
      <Box maw={760}>
        <TextInput
          placeholder="Type here.."
          label="Search article by title."
          sx={{ margin: "1rem 0" }}
          radius="md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <ArticlesLists
        filteredArticles={filteredArticles}
        articles={articles}
        setArticles={setArticles}
        searchQuery={searchQuery}
      />
    </Box>
  );
};

export default ArticlePreview;
