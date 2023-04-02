import { Box } from "@mantine/core";
import React from "react";

type MainContentProps = {
  children: React.ReactElement;
};

const MainContent = ({ children }: MainContentProps) => {
  return (
    <Box
      component="main"
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ccc",
        gap: '1rem',
        minHeight:'100vh'
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;
