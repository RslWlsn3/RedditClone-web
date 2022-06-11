import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
interface registerProps {}

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{}, login] = useLoginMutation();
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              label="Username Or Email"
              placeholder="username Or email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                label="password"
                placeholder="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              variant="solid"
              isLoading={isSubmitting}
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

//we have to create the urql client is so we can call the mutation
//(in this case the mutation is the LoginMutation)
//I am not setting ssr since there are no queries on this page which are important to seo
export default withUrqlClient(createUrqlClient)(Login);
