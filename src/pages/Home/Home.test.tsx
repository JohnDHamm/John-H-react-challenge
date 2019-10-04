import React from "react";
import Home from "./Home";
import Signup from "../Signup/Signup";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { subTestidInit } from "../../utils";

const mockContext = jest.fn();
jest.mock("../../App", (): any => ({
  UserContext: {
    Consumer: (props: any): any => props.children(mockContext())
  }
}));

const testid = "Home";
const subTestid = subTestidInit(testid);

describe("Home", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  describe("when a user is signed in", (): void => {
    it("should redirect user to '/appointments'", (): void => {
      mockContext.mockReturnValue({ name: "spongebob" });

      const { container } = render(
        <MemoryRouter initialEntries={["/"]}>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/appointments"
            render={(): JSX.Element => <div>Redirected!</div>}
          />
        </MemoryRouter>
      );

      expect(container).toHaveTextContent("Redirected!");
    });
  });

  describe("when a user is not signed in", (): void => {
    it("should render a sign in form", (): void => {
      mockContext.mockReturnValue(null);
      const onLoginFormSubmit = jest.fn();

      const { getByTestId } = render(
        <MemoryRouter initialEntries={["/"]}>
          <Route
            path="/"
            render={(props): JSX.Element => (
              <Home
                {...props}
                loginSubmissionErrors={false}
                onLoginFormSubmit={onLoginFormSubmit}
              />
            )}
          />
        </MemoryRouter>
      );

      expect(getByTestId(subTestid("UsernameInput"))).toBeInTheDocument();
      expect(getByTestId(subTestid("PasswordInput"))).toBeInTheDocument();
      expect(getByTestId(subTestid("SubmitButton"))).toBeInTheDocument();
      expect(getByTestId(subTestid("SignupButton"))).toBeInTheDocument();
    });

    it("should display an error message if 'loginSubmissionErrors' is true", (): void => {
      mockContext.mockReturnValue(null);
      const onLoginFormSubmit = jest.fn();

      const { container } = render(
        <MemoryRouter initialEntries={["/"]}>
          <Route
            path="/"
            render={(props): JSX.Element => (
              <Home
                {...props}
                loginSubmissionErrors={true}
                onLoginFormSubmit={onLoginFormSubmit}
              />
            )}
          />
        </MemoryRouter>
      );

      expect(container).toHaveTextContent(
        "Your username or password is incorrect."
      );
    });

    it("should not call onLoginFormSubmit if either input is empty", (): void => {
      mockContext.mockReturnValue(null);
      const onLoginFormSubmit = jest.fn();

      const { getByTestId } = render(
        <MemoryRouter initialEntries={["/"]}>
          <Route
            path="/"
            render={(props): JSX.Element => (
              <Home
                {...props}
                loginSubmissionErrors={false}
                onLoginFormSubmit={onLoginFormSubmit}
              />
            )}
          />
        </MemoryRouter>
      );

      fireEvent.change(getByTestId(subTestid("UsernameInput")), {
        target: { value: "test" }
      });
      fireEvent.click(getByTestId(subTestid("SubmitButton")));

      expect(onLoginFormSubmit).not.toHaveBeenCalled();

      fireEvent.change(getByTestId(subTestid("UsernameInput")), {
        target: { value: "" }
      });
      fireEvent.change(getByTestId(subTestid("PasswordInput")), {
        target: { value: "test" }
      });
      fireEvent.click(getByTestId(subTestid("SubmitButton")));

      expect(onLoginFormSubmit).not.toHaveBeenCalled();
    });

    it("should call onLoginFormSubmit with the username and password if both inputs are valid", (): void => {
      mockContext.mockReturnValue(null);
      const onLoginFormSubmit = jest.fn();
      const username = "testy";
      const password = "Mctesterson";

      const { getByTestId } = render(
        <MemoryRouter initialEntries={["/"]}>
          <Route
            path="/"
            render={(props): JSX.Element => (
              <Home
                {...props}
                loginSubmissionErrors={false}
                onLoginFormSubmit={onLoginFormSubmit}
              />
            )}
          />
        </MemoryRouter>
      );

      fireEvent.change(getByTestId(subTestid("UsernameInput")), {
        target: { value: username }
      });
      fireEvent.change(getByTestId(subTestid("PasswordInput")), {
        target: { value: password }
      });
      fireEvent.click(getByTestId(subTestid("SubmitButton")));

      expect(onLoginFormSubmit).toHaveBeenCalledTimes(1);
      expect(onLoginFormSubmit).toHaveBeenCalledWith({ username, password });
    });

    it("should redirect to the sign-up form page when the sign up button is clicked", (): void => {
      mockContext.mockReturnValue(null);
      const onSignupFormSubmit = jest.fn();

      const { getByTestId } = render(
        <MemoryRouter initialEntries={["/"]}>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/signup"
            render={(props): JSX.Element => (
              <Signup 
                {...props}
                signupSubmissionErrors={false}
                onSignupFormSubmit={onSignupFormSubmit}
              />
            )}
          />
        </MemoryRouter>
      );

      fireEvent.click(getByTestId(subTestid("SignupButton")));
      expect(getByTestId("Signup-SubmitButton")).toBeInTheDocument();
    })
  });
});
