import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import { PostsQuery } from '../generated/graphql';


interface UpdootSectionProps {
    post: PostsQuery["posts"]["posts"][0];
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
        return (
        <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
        <IconButton aria-label='Search database' icon={<ChevronUpIcon w={6} h={6}/>} />                
        {post.points}
        <IconButton aria-label='Search database' icon={<ChevronDownIcon w={6} h={6}/>} />                
      </Flex>  
    );
}


