import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import { userInfo } from "os";
import { link } from "fs";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body;

  //loading
  if (fetching) {
    body = null;
    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href={"/login"}>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href={"/register"}>
          <Link>register</Link>
        </NextLink>
      </>
    );
    //user is logged in
  } else if (data.me.username) {
    body = (
      <Flex>
        {" "}
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tan" p={4}>
      <Box ml={"auto"}>
        {/* NextLink uses client side routing */}
        {body}
      </Box>
    </Flex>
  );
};
