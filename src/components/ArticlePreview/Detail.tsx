import { ArticlesType } from "@/types";
import { Box, Card, Flex, Text, Title } from "@mantine/core";
import moment from "moment";
import Image from "next/image";
import React from "react";

type DetailProps = {
  article: ArticlesType;
};

const dummyImg =
  "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80";

const Detail = ({ article }: DetailProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" bg="white" p={18}>
      <Flex
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
    </Card>
  );
};

export default Detail;
