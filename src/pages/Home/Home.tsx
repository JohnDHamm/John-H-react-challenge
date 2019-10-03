import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { UserContext } from "../../App";
import {
  HomeContainer,
  Button,
  Form,
  Heading,
  Input,
  Label,
  PasswordFormControl,
  UsernameFormControl,
  SignupMessage,
  StyledLink
} from "./Home.styles";
import { subTestidInit } from "../../utils";

interface FormErrors {
  password?: string;
  username?: string;
}

interface Props {
  loginSubmissionErrors: boolean;
  onLoginFormSubmit: (loginFormValues: {
    username: string;
    password: string;
  }) => void;
}

const Home: React.FC<RouteComponentProps & Props & Testable> = ({
  loginSubmissionErrors,
  onLoginFormSubmit,
  testid = "Home"
}) => {
  const subTestid = subTestidInit(testid);

  const [username, setUsername] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [formErrors, setFormErrors] = useState<FormErrors | undefined>();

  const validateFields = (): FormErrors => {
    const errors: FormErrors = {};

    if (!username) errors.username = "Missing username.";
    if (!password) errors.password = "Missing password.";

    return errors;
  };

  const handleFormSubmission = (
    e: React.SyntheticEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    if (!username || !password) {
      const errors = validateFields();
      return setFormErrors(errors);
    }

    onLoginFormSubmit({ username, password });
  };

  const hasFormError = (): boolean => loginSubmissionErrors && !formErrors;

  return (
    <HomeContainer data-testid={testid}>
      <UserContext.Consumer>
        {(user): JSX.Element => {
          if (user) return <Redirect to="/appointments" />;

          return (
            <Form
              name="sign in"
              onSubmit={handleFormSubmission}
              data-testid={subTestid("Form")}
            >
              <Heading data-testid={subTestid("FormHeading")}>Sign In</Heading>
              <UsernameFormControl>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  inputError={formErrors && formErrors.username ? true : false}
                  onChange={({ target: { value: username } }): void =>
                    setUsername(username)
                  }
                  data-testid={subTestid("UsernameInput")}
                  type="text"
                />
              </UsernameFormControl>
              <PasswordFormControl formError={hasFormError()}>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  inputError={formErrors && formErrors.password ? true : false}
                  onChange={({ target: { value: password } }): void =>
                    setPassword(password)
                  }
                  data-testid={subTestid("PasswordInput")}
                  type="text"
                />
              </PasswordFormControl>
              {hasFormError() && (
                <p style={{ color: "red", fontSize: "1rem", marginTop: "0" }}>
                  Your username or password is incorrect.
                </p>
              )}
              <Button data-testid={subTestid("SubmitButton")} type="submit">
                Sign In
              </Button>
            </Form>
          );
        }}
      </UserContext.Consumer>
      <SignupMessage>
        Not registered yet?
      </SignupMessage>
      <StyledLink to="/signup">
        Sign Up
      </StyledLink>
    </HomeContainer>
  );
};

export default Home;
