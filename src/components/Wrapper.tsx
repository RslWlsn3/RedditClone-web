import { Box } from "@chakra-ui/react";
import exp from "constants";
import React from "react";

export type WrapperVariant = "small" | "large";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "large",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "large" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};
