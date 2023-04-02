import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Footer = () => {
  return (
    <footer
      className={inter.className}
      style={{
        backgroundColor: "midnightblue",
        padding: "20px",
        color: "white",
      }}
    >
      Footer
    </footer>
  );
};

export default Footer;
