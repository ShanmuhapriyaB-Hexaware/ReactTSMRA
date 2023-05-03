import React from 'react';
import Textfield from './Textfield';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

describe("<Textfield />", () => {
    test("renders the Textfield component", async () => {
        render(<Textfield
            placeholder="email"
            label="email"
            value="123@gmail.com" />
        );
        expect(await screen.getByDisplayValue('123@gmail.com')).toBeInTheDocument();
        // expect(await screen.getByText('label')).toHaveTextContent('email');
        // expect(await screen.getAllByDisplayValue('value')).toHaveTextContent('123@gmail.com');


    })
}) 