import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import DateTimePicker from ".";

describe("DateTimePicker tests", () => {
  test("renders the DatePicker",async () => {
    render(<DateTimePicker type='time' label="Sample Time" />)
    expect(await screen.getByLabelText('Sample Date')).toBeInTheDocument();
  });
});

  