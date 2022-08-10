import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({ limit: 15, cursor: null as null | string,});
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data){
    return <div>Fetch failed, no data :/</div>
  }

  return (
    <Layout>
      <Flex align="center">
        <Heading>CMReddit</Heading>
        <div style={{ marginLeft: "auto" }}></div>
        <Link href="/create-post">create post</Link>
      </Flex>
      <br />
      <Stack spacing={8}>
        {fetching && !data ? (
          <div>loading...</div>
        ) : (
          data.posts.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text>Posted by {p.creator.username}</Text> 
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))
        )}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex>
          <Button onClick={() =>
            setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length -1].createdAt,
            })
          } isLoading={fetching} colorScheme="twitter" variant="solid" m="auto" my={4}>
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
// export default withUrqlClient(createUrqlClient, { ssr: true})(Index);
