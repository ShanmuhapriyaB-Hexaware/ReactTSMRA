import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Button from "./Button";

describe("Button tests", () => {
  test("renders the Button component",async () => {
    render(<Button label="Hello world!" />);
    expect(await screen.getByRole('button')).toBeInTheDocument()   

  });
});

// test('Ensure math works', () => {
//     expect(1 + 2).toEqual(3);
//   });
  