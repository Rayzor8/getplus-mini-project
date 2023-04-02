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
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;
