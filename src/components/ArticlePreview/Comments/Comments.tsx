import { ArticlesType, CommentsType } from "@/types";
import { Box, Button, Flex, Text, TextInput, Title } from "@mantine/core";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import axios, { Method } from "axios";

type CommentsProps = {
  article: ArticlesType;
};

const Comments = ({ article }: CommentsProps) => {
  const [comments, setComments] = useState<CommentsType[]>([]);
  const [method, setMethod] = useState<Method>("post");

  const addForm = useForm({
    initialValues: {
      user: "",
      comment: "",
      id: "",
    },
  });

  const fetchComments = useCallback(async () => {
    const { data } = await axios(
      `https://62d5368fd4406e5235558a46.mockapi.io/articles/${article.id}/comments`
    );
    setComments(data);
  }, [article]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleDeleteComment = async (id: string) => {
    try {
      await axios.delete(
        `https://62d5368fd4406e5235558a46.mockapi.io/articles/${article.id}/comments/${id}`
      );
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values: {
    user: string;
    comment: string;
    id: string;
  }) => {
    try {
      await axios.request({
        method,
        url: `https://62d5368fd4406e5235558a46.mockapi.io/articles/${
          article.id
        }/comments/${method && values.id}`,
        data: { user: values.user || "Anonymous", comment: values.comment },
      });

      fetchComments();
    } catch (error) {
      console.error(error);
    } finally {
      addForm.setValues({
        user: "",
        comment: "",
        id: "",
      });
      setMethod("post");
    }
  };

  return (
    <Flex direction="column" gap={24}>
      <Title order={2}>Comments</Title>
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
            <Text fz="xs" fs="italic">
              {moment(comment.createdAt).format("LL")}
            </Text>
          </Flex>
          <Text fz="md">{comment.comment}</Text>
          <Button.Group>
            <Button
              variant="default"
              onClick={() => handleDeleteComment(comment.id)}
            >
              Delete
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setMethod("put");
                addForm.setValues({
                  user: comment.user,
                  comment: comment.comment,
                  id: comment.id,
                });
              }}
            >
              Edit
            </Button>
          </Button.Group>
        </Flex>
      ))}

      <Box miw={360} p={20} bg="white">
        <Title order={3}>Comment Form</Title>
        <form onSubmit={addForm.onSubmit(handleSubmit)}>
          <TextInput
            label="User"
            placeholder="User"
            {...addForm.getInputProps("user")}
          />
          <TextInput
            mt="sm"
            label="Comment"
            placeholder="Comment"
            {...addForm.getInputProps("comment")}
          />
          <Button type="submit" mt="sm">
            {method === "post" ? "Add Comment" : "Edit Comment"}
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Comments;
