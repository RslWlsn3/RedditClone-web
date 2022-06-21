import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";

const CreatePost: React.FC<{}> = ({}) => {
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="Title" placeholder="title" />
            <Box mt={4}>
              <InputField name="text" placeholder="text..." label="Body" />
            </Box>
            <Flex mt={2}></Flex>
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              variant="solid"
              isLoading={isSubmitting}
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default CreatePost;
