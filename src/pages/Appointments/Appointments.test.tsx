import React from "react";
import Appointments from "./Appointments";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { subTestidInit } from "../../utils";

const mockContext = jest.fn();
jest.mock("../../App", (): any => ({
  UserContext: {
    Consumer: (props: any): any => props.children(mockContext())
  }
}));

const testid = "Appointments";
const subTestid = subTestidInit(testid);

describe("Appointments", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  describe("when a user isn't signed in", (): void => {
    it("should redirect user to '/'", (): void => {
      mockContext.mockReturnValue(null);

      const { container } = render(
        <MemoryRouter initialEntries={["/appointments"]}>
          <Route exact path="/appointments" component={Appointments} />
          <Route
            exact
            path="/"
            render={(): JSX.Element => <div>Redirected!</div>}
          />
        </MemoryRouter>
      );

      expect(container).toHaveTextContent("Redirected!");
    });
  });

  describe("when a user is signed in", (): void => {
    it("should render a list of the user's appointments", (): void => {
      mockContext.mockReturnValue({ id: 1234 });

      const { getByTestId } = render(
        <MemoryRouter initialEntries={["/appointments"]}>
          <Route
            exact
            path="/appointments"
            component={Appointments}
          />
        </MemoryRouter>
      );

      expect(getByTestId(testid)).toHaveTextContent("Your Appointments");
      expect(getByTestId("Filters")).toBeInTheDocument();
      expect(getByTestId(testid)).toHaveTextContent("Loading...");

    });
  });

  //TODO: test mocking the fetch appointments and expecting rendered appointments

});
