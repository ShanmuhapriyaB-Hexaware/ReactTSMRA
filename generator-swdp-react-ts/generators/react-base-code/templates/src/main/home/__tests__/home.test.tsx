import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

describe("Home", () => {
  it("should be defined", () => {
    render(<Home />);
  });
});

describe("Last Text Is Rendered", () => {
  beforeEach(() => {
    render(<Home />)
  })
  
  it("should render the text", () => {
    expect(screen.getByText("Click on the React logo to learn more")).toBeInTheDocument();
  });
});


