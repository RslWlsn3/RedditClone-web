import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>
      {/* NextLink uses client side routing */}
        <NextLink href={"/login"}> uses 
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href={"/register"}>
          <Link>register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};
