import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { Alert } from '..';

function renderAlert(props: any = {}) {
    return render(<Alert
        {...props} />
    );
};

describe("<Alert />", () => {
    test("renders the Alert component", async () => {
        const { getByRole } = renderAlert();
        expect(await screen.getByRole('alert')).toBeInTheDocument();
    })
}) 