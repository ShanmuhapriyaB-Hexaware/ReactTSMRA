import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import NotAuthenticated from '../NotAuthenticated';

describe("NotAuthenticated", () => {
    beforeEach(() => {
        render(<NotAuthenticated />)
    })
    it("should render the text", () => {
        expect(screen.getByText("401 Hold Up!")).toBeInTheDocument();
        expect(screen.getByText("You are not authenticated to view this page")).toBeInTheDocument();
        expect(screen.getByText("Sorry about that! Please login to access RapidX!")).toBeInTheDocument();
        expect(screen.getByText("Go to home")).toBeInTheDocument();
    });
});


