import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import ErrorFallback from '../Error';

describe("Error", () => {
    beforeEach(() => {
        render(<ErrorFallback />)
    })
    it("should render the text", () => {
        expect(screen.getByText("Something Went Wrong")).toBeInTheDocument();
        expect(screen.getByText("Contact Administrator")).toBeInTheDocument();
        expect(screen.getByText("Back to Home")).toBeInTheDocument();
    });
});


