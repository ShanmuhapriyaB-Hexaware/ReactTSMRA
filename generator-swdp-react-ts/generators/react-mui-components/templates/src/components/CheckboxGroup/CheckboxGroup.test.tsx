import React from "react"
import {render, screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import CheckboxGroup from "./CheckboxGroup";
import Checkbox  from "../Checkbox";

function renderCheckboxGroup(props: any={}){

    return render(
        <CheckboxGroup data-testid="checkboxGroup" grouplabel="CheckBox Group">
            <Checkbox data-testid="checkbox1" type="checkbox" size="small" color="success" label="CheckBox1"/>
            <Checkbox size="small" color="secondary" label= "CheckBox2"/>
        </CheckboxGroup>
    )

}

describe("<CheckboxGroup />", ()=>{

    test("CheckBoxGroup is rendered", async() => {
        const {getByTestId} = renderCheckboxGroup();
        expect(await screen.getByTestId('checkboxGroup')).toBeInTheDocument()
        // expect(await screen.getByLabelText('CheckBox1')).toBeChecked()
    })

    test("CheckBox1 is clicked", async() => {
        const { getByTestId} = renderCheckboxGroup()
        const Box1 = await screen.getByTestId('checkbox1')
        fireEvent.click(Box1);

        expect(screen.getByTestId('checkbox1')).toBeInTheDocument()
        // expect(screen.getByTestId('checkbox1')).toHaveValue()
    })
    

})
