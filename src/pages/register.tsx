import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
interface registerProps {}

const REGISTER_MUT = `
mutation Register($username: String!, $password:String!){
  register(options: {username: $username, password: $password}){
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`;

const Register: React.FC<registerProps> = ({}) => {
  const [{},register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values)
          register(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="username" placeholder="Username" />
            <Box mt={4}>
            <InputField name="password" label="password" placeholder="Password" type="password" />
            </Box>
            <Button type="submit" colorScheme='teal' variant='solid' isLoading={isSubmitting}>register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
