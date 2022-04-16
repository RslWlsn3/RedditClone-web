import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  varient?: "small" | "large";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  varient = "large",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={varient === "large" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};
