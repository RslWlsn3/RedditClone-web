import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
interface registerProps {}

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{},login] = useLoginMutation();
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, {setErrors}) => {
          console.log(values)
          const response = await login({ options: values})
          if (response.data?.login.errors)
          {
            setErrors(toErrorMap(response.data.login.errors))
          }
          else if (response.data?.login.user){
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="username" placeholder="Username" />
            <Box mt={4}>
            <InputField name="password" label="password" placeholder="Password" type="password" />
            </Box>
            <Button type="submit" colorScheme='teal' variant='solid' isLoading={isSubmitting}>login</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
