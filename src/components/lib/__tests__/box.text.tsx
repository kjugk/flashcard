import React from "react";
import { render, screen } from "@testing-library/react";
import { Box } from "../box";

test("show children.", () => {
  const text = "box children";
  render(<Box data-testid="t1">{text}</Box>);

  expect(screen.getByTestId("t1")).toHaveTextContent(text);
});

describe("box-shadow", () => {
  const boxShadowStyle = "box-shadow: 0px 2px 2px rgba(0,0,0,0.2)";

  test("has box-shadow style by default.", () => {
    render(<Box data-testid="t1" />);
    expect(screen.getByTestId("t1")).toHaveStyle(boxShadowStyle);
  });

  test("has no boxshadow style when withShadow prop is false.", () => {
    render(<Box data-testid="t1" withShadow={false}></Box>);
    expect(screen.getByTestId("t1")).not.toHaveStyle(boxShadowStyle);
  });
});
