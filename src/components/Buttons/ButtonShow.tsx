import React from "react";
import { Button } from "@mantine/core";

type ButtonShowProps = {
  children: React.ReactNode;
  color: "violet" | "red";
  onClick: () => void;
  disabled?: boolean;
};

const ButtonShow = ({
  children,
  color,
  onClick,
  disabled,
}: ButtonShowProps) => {
  return (
    <Button
      color={color}
      onClick={onClick}
      disabled={disabled}
      // sx={{ maxWidth: "max-content" }}
      px={{base:20,sm:60}}
    >
      {children}
    </Button>
  );
};

export default ButtonShow;
