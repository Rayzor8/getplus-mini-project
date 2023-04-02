import { ArticlesType, CommentsType } from "@/types";
import { Button, Flex, Text, Textarea, Title } from "@mantine/core";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

type CommentsProps = {
  article: ArticlesType
}

const Comments = ({article}:CommentsProps) => {
  const [comments, setComments] = useState<CommentsType[]>([]);

  const fetchComments = useCallback(async () => {
    const commentsRes = await fetch(
      `https://62d5368fd4406e5235558a46.mockapi.io/articles/${article.id}/comments`
    );
    const commentsData = await commentsRes.json();
    setComments(commentsData);
  }, [article]);



  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  
  return (
    <Flex direction="column" gap={10}>
      <Title order={1}>Comments</Title>

      {comments.map((comment) => (
        <Flex
          direction="column"
          key={comment.id}
          gap={8}
          sx={{ backgroundColor: "white", padding: "1rem" }}
        >
          <Flex gap={10} justify="start" align="center">
            <Text fz="lg" fw="bold">
              {comment.user}
            </Text>
            <Text fz="sm" fs="italic">
              {moment(comment.createdAt).format("LL")}
            </Text>
          </Flex>
          <Text fz="md">{comment.comment}</Text>
          <Textarea
            placeholder="Type here..."
            label="Add comment"
            withAsterisk
          />
          <Button.Group>
            <Button variant="default">Add</Button>
            <Button variant="default">Delete</Button>
            <Button variant="default">Edit</Button>
          </Button.Group>
        </Flex>
      ))}
    </Flex>
  );
};

export default Comments;
