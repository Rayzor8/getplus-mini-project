import React from "react";
import { Inter } from "next/font/google";
import { Box, Title } from "@mantine/core";

const Footer = () => {
  return (
    <Box
      component="footer"
      bg="violet"
      sx={{
        padding: "10px",
        color: "white",
      }}
    >
      <Title order={5}>Footer</Title>
    </Box>
  );
};

export default Footer;
