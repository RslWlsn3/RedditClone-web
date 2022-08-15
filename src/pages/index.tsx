import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { Box, Button, Flex, Heading, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { UpdootSection } from "../components/UpdootSection";

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
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              {/* <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
                <IconButton aria-label='Search database' icon={<ChevronUpIcon w={6} h={6}/>} />                
                {p.points}
                <IconButton aria-label='Search database' icon={<ChevronDownIcon w={6} h={6}/>} />                
              </Flex> */}
              <UpdootSection/>
              <Box>
                <Heading fontSize="xl">{p.title}</Heading>
                <Text>Posted by {p.creator.username}</Text> 
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            </Flex>
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
