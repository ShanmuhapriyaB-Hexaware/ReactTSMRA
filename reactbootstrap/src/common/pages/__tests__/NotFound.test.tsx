import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import NotFound from '../NotFound';

describe("NotFound", () => {
    beforeEach(() => {
        render(<NotFound />)
    })
    it("should render the text", () => {
        expect(screen.getByText("Oops!")).toBeInTheDocument();
        expect(screen.getByText("The requested page cannot be found.")).toBeInTheDocument();
        expect(screen.getByText("Sorry about that! Please visit our hompage to get where you need to go.")).toBeInTheDocument();
        expect(screen.getByText("Back to Home!")).toBeInTheDocument();
    });
});


