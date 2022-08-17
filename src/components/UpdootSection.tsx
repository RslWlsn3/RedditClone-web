import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import { PostSnippetFragment, PostsQuery, useVoteMutation } from '../generated/graphql';


interface UpdootSectionProps {
    post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");  
  const [, vote] = useVoteMutation();      
  return (
        <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
        <IconButton aria-label='Search database' onClick={ async () => {
          setLoadingState("updoot-loading")
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading")
        }} isLoading={loadingState==="updoot-loading"} icon={<ChevronUpIcon w={6} h={6}/>} />                
        {post.points}
        <IconButton aria-label='Search database' onClick={async () => {
          setLoadingState("downdoot-loading")
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading")
        }} isLoading={loadingState==="downdoot-loading"} icon={<ChevronDownIcon w={6} h={6}/>} />                
      </Flex>  
    );
}


