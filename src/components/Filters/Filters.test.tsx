import React from "react";
import { render } from "@testing-library/react";
import Filters from "./Filters";

describe("Filters", () => {
  it("renders the filter buttons", () => {
    const { getByTestId } = render(
      <Filters
        activeFilters={[]}
        onChange={() => null} 
      />
    );

    expect(getByTestId("FilterButton-pending")).toBeInTheDocument();
    expect(getByTestId("FilterButton-approved")).toBeInTheDocument();
    expect(getByTestId("FilterButton-in progress")).toBeInTheDocument();
    expect(getByTestId("FilterButton-finalized")).toBeInTheDocument();
  });
})