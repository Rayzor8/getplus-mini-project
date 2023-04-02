import { Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "midnightblue",
        padding: "20px",
        color: "white",
      }}
    >
      <Link href="/">
        <Title color="white">Homepage</Title>
      </Link>
    </header>
  );
};

export default Header;
