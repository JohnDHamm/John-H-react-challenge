import React from "react";
import { render } from "@testing-library/react";
import FilterButton from "./FilterButton";
import { subTestidInit } from "../../utils";

const testid = "FilterButton";
const subTestid = subTestidInit(testid);

describe("FilterButton", () => {
  it("renders a filter button with given label", () => {
    const testLabel = "test label"
    const { getByTestId } = render(
        <FilterButton
          onClick={() => null}
          selected={true}
          label={testLabel} />
    );

    expect(getByTestId(subTestid(testLabel))).toHaveTextContent("test label");
  });
});
