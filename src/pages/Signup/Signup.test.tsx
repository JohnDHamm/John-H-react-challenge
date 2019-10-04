import React from "react";
// import Home from "./Home";
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

const testid = "Signup";
const subTestid = subTestidInit(testid);

describe("Signup", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  it("should render a sign up form", (): void => {
    mockContext.mockReturnValue(null);
    const onSignupFormSubmit = jest.fn();

    const { getByTestId } = render(
        <MemoryRouter initialEntries={["/signup"]}>
          <Route
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

      expect(getByTestId(subTestid("UsernameInput"))).toBeInTheDocument();
      expect(getByTestId(subTestid("PasswordInput"))).toBeInTheDocument();
      expect(getByTestId(subTestid("SubmitButton"))).toBeInTheDocument();
  });

  it("should render an error message and not call onSignupFormSubmission for invalid password", (): void => {
    mockContext.mockReturnValue(null);
    const onSignupFormSubmit = jest.fn();
    const username = "testy";
    const password = "invalidPassword";

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Route
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

    fireEvent.change(getByTestId(subTestid("UsernameInput")), {
      target: { value: username }
    });
    fireEvent.change(getByTestId(subTestid("PasswordInput")), {
      target: { value: password }
    });

    expect(getByTestId(testid)).toHaveTextContent(
      "Password must contain at least 1 number, 1 symbol, and 2 capital letters.")

    fireEvent.click(getByTestId(subTestid("SubmitButton")));
    expect(onSignupFormSubmit).not.toHaveBeenCalled();
  });
  
  it("should not call onSignupFormSubmit if either input is empty", (): void => {
    mockContext.mockReturnValue(null);
    const onSignupFormSubmit = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Route
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

    fireEvent.change(getByTestId(subTestid("UsernameInput")), {
      target: { value: "test" }
    });
    fireEvent.click(getByTestId(subTestid("SubmitButton")));

    expect(onSignupFormSubmit).not.toHaveBeenCalled();

    fireEvent.change(getByTestId(subTestid("UsernameInput")), {
      target: { value: "" }
    });
    fireEvent.change(getByTestId(subTestid("PasswordInput")), {
      target: { value: "test" }
    });
    fireEvent.click(getByTestId(subTestid("SubmitButton")));

    expect(onSignupFormSubmit).not.toHaveBeenCalled();
  });

  //TODO: figure out why onSignupFormSubmit is not being called
  xit("should call onSignupFormSubmit with the username and password if both inputs are valid", (): void => {
    mockContext.mockReturnValue(null);
    const onSignupFormSubmit = jest.fn();
    const username = "testy";
    const password = "ValidPassw0rd!";

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Route
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

    fireEvent.change(getByTestId(subTestid("UsernameInput")), {
      target: { value: username }
    });
    fireEvent.change(getByTestId(subTestid("PasswordInput")), {
      target: { value: password }
    });

    expect(getByTestId(testid)).not.toHaveTextContent(
      "Password must contain at least 1 number, 1 symbol, and 2 capital letters.")

    fireEvent.click(getByTestId(subTestid("SubmitButton")));

    expect(onSignupFormSubmit).toHaveBeenCalledTimes(1);
    expect(onSignupFormSubmit).toHaveBeenCalledWith({ username, password });
  });



  // it should redirect to appointments after sign up
  it("should redirect user to '/appointments'", (): void => {
    mockContext.mockReturnValue({ id: 1234 });

    const { container } = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Route exact path="/signup" component={Signup} />
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

