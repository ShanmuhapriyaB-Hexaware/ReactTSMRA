import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

describe("Home", () => {
  it("should work as expected", () => {
    render(<Home />);
    expect(screen.getByText("Edit src/main/home/pages/Home.tsx and save to test HMR")).toBeInTheDocument();
  });
});
