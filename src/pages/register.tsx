import React from "react";
import { Formik } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Wrapper } from "./Wrapper";
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange }) => (
          <FormControl isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              value={values.username}
              onChange={handleChange}
              id="username"
              placeholder="Username"
            />
          </FormControl>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
