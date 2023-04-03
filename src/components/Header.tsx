import { Box, Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <Box component="header" bg="violet"
      sx={{
        padding: "20px",
        color: "white",
      }}
    >
      <Link href="/">
        <Title color="white">Homepage</Title>
      </Link>
    </Box>
  );
};

export default Header;
