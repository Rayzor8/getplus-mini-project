import { ArticlesType, CommentsType } from "@/types";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
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
    } finally {
      addForm.setValues({
        user: "",
        comment: "",
        id: "",
      });
      setMethod("post");
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

  const checkerInput =
    !addForm.values.user && !addForm.values.comment ? true : false;

  return (
    <Flex direction="column" gap={24}>
      <Title order={2}>Comments</Title>
      <Grid gutter={10} columns={4}>
        {comments.map((comment) => (
          <Grid.Col key={comment.id} sm={2}>
            <Card shadow="sm" padding="lg" radius="md" bg="white" p={18}>
              <Flex direction="column" key={comment.id} gap={8}>
                <Flex gap={10} justify="start" align="center">
                  <Text fz="lg" fw="bold">
                    {comment.user}
                  </Text>
                  <Text fz="xs" fs="italic">
                    {moment(comment.createdAt).format("LL")}
                  </Text>
                </Flex>
                <Text fz="md">{comment.comment}</Text>
                <Button.Group sx={{ gap: "3px" }}>
                  <Button
                    variant="light"
                    color="red"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="light"
                    color="violet"
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
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Card maw={600} p={20} radius="md">
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
          <Button type="submit" mt="sm" color="violet">
            {method === "post" || checkerInput ? "Add Comment" : "Edit Comment"}
          </Button>
        </form>
      </Card>
    </Flex>
  );
};

export default Comments;
