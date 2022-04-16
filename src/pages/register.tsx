import React from "react";
import { Form, Formik } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange }) => (
          <Form>
            <InputField name="username" label="username" placeholder="Username" />
            <InputField name="password" label="password" placeholder="Password" type="password" />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
