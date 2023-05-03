import React from 'react';
import MultiSelectDropDown from './MultiSelectDropDown';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';




function renderMultiSelectDropDown(props: any = {}) {

    return render(<MultiSelectDropDown {...props}
        sx={{ width: "200px" }}
        url="Data.json"
        label="sample"
        id="97yr78y7s"
        options={props.options}
        multiple />
    )
}

describe("<MultiSelectDropDown />", () => {
    test("renders the MultiSelectDropDown component", async () => {
        const { getByRole, getByTestId } = renderMultiSelectDropDown();
        expect(await screen.getByRole('combobox')).toBeInTheDocument();
        expect(await screen.getByTestId('ArrowDropDownIcon')).toBeInTheDocument();
    })
}) 
