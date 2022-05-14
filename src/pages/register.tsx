import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [{},register] = useRegisterMutation();
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, {setErrors}) => {
          console.log(values)
          const response = await register(values)
          if (response.data?.register.errors)
          {
            setErrors(toErrorMap(response.data.register.errors))
          }
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
