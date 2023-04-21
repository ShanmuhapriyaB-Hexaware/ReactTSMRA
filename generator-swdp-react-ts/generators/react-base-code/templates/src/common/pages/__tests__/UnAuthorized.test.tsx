import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import UnAuthorized from '../UnAuthorized';

describe("UnAuthorized", () => {
    beforeEach(() => {
        render(<UnAuthorized />)
    })
    it("should render the text", () => {
        expect(screen.getByText("403 Hold Up!")).toBeInTheDocument();
        expect(screen.getByText("You are unauthorized to view this page")).toBeInTheDocument();
        expect(screen.getByText("Sorry about that! Please check the permission level to view this page.")).toBeInTheDocument();
        expect(screen.getByText("Go to Home")).toBeInTheDocument();
    });
});


