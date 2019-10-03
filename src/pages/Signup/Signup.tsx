import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { UserContext } from "../../App";
import {
  Button,
  Form,
  Heading,
  Input,
  Label,
  PasswordFormControl,
  UsernameFormControl
} from "../Home/Home.styles";
import { subTestidInit } from "../../utils";
import CenteredContainer from "../../universalStyles/CenteredContainer";

interface FormErrors {
  password?: string;
  username?: string;
}

interface Props {
  signupSubmissionErrors: boolean;
  onSignupFormSubmit: (loginFormValues: {
    username: string;
    password: string;
  }) => void;
}

const Signup: React.FC<RouteComponentProps & Props & Testable> = ({
  signupSubmissionErrors, //TODO: use for checking for duplicate username already registered
  onSignupFormSubmit,
  testid = "Signup"
}) => {
  const subTestid = subTestidInit(testid);

  const [username, setUsername] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [formErrors, setFormErrors] = useState<FormErrors | undefined>();
  const [passwordError, setPasswordError] = useState<boolean>(false);

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

    onSignupFormSubmit({ username, password });
  };

  //TODO: use hasFormError in future when checking for already existing username
  // const hasFormError = (): boolean => signupSubmissionErrors && !formErrors;

  const validatePassword = (password: string) => {
    console.log('password', password);
    console.log("test:", /(?=.*\d)(?=.*[\W_])(?=(.*[A-Z]){2})/.test(password))
    if (!/(?=.*\d)(?=.*[\W_])(?=(.*[A-Z]){2})/.test(password)) {
      setPassword(password);
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }

  return (
    <CenteredContainer data-testid={testid}>
      <UserContext.Consumer>
        {(user): JSX.Element => {
          if (user) return <Redirect to="/appointments" />;

          return (
            <Form
              name="sign up"
              onSubmit={handleFormSubmission}
              data-testid={subTestid("Form")}
            >
              <Heading data-testid={subTestid("FormHeading")}>Sign Up</Heading>
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
              {/* {hasFormError() && (
                <p style={{ color: "red", fontSize: "1rem", marginTop: "0" }}>
                  That username is already taken, please choose another.
                </p>
              )} */}
              <PasswordFormControl formError={passwordError}>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  inputError={formErrors && formErrors.password ? true : false}
                  onChange={({ target: { value: password } }): void =>
                    validatePassword(password)
                  }
                  data-testid={subTestid("PasswordInput")}
                  type="text"
                />
              </PasswordFormControl>
              {passwordError && (
                <p style={{ color: "red", fontSize: "1rem", marginTop: "0" }}>
                  Password must contain at least 1 number, 1 symbol, and 2 capital letters.
                </p>
              )}
              <Button data-testid={subTestid("SubmitButton")} type="submit">
                Sign Up
              </Button>
            </Form>
          );
        }}
      </UserContext.Consumer>
    </CenteredContainer>
  );
};

export default Signup;
