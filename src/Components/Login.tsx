import {
  Container,
  Text,
  Grid,
  Paper,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import useStore from "../Store";

const Login = () => {
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  const [badCredentials, setBadCredentials] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (values: { email: string; password: string }) => {
    setUser(values);
  };
  return (
    <Container size="xl">
      <Grid justify="center">
        <Grid.Col span={12} md={4}>
          <Paper p="md">
            <form onSubmit={form.onSubmit(handleSubmit)} data-testid="form">
              <TextInput
                data-autofocus
                required
                placeholder="Enter your Email"
                label="Email"
                {...form.getInputProps("email")}
                onFocus={() => {
                  form.setFieldError("email", false), setBadCredentials(false);
                }}
              />
              <PasswordInput
                style={{ paddingTop: "10px" }}
                required
                placeholder="Password"
                label="Password"
                {...form.getInputProps("password")}
                onFocus={() => {
                  form.setFieldError("password", false),
                    setBadCredentials(false);
                }}
                // error={
                //   (form.errors.password) &&
                //   "Password should contain at least 2 characters"
                // }
              />
              {badCredentials ? (
                <Text size="sm" color="red">
                  Username or Password is not valid!Please try again
                </Text>
              ) : null}
              <Button
                data-testid="login_btn"
                color="blue"
                type="submit"
                style={{ marginTop: "15px" }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
export default Login;
