import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import RedirectHere from '../RedirectHere';

describe("RedirectHere", () => {
    beforeEach(() => {
        render(<RedirectHere />)
    })
    it("should render the text", () => {
        expect(screen.getByText("Redirecting")).toBeInTheDocument();
      });
});


