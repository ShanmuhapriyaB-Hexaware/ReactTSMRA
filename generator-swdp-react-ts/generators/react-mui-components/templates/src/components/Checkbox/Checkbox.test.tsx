import React from "react"
import {render, screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import Checkbox  from "./Checkbox";

function renderCheckbox(props: any={}){

    return render(<Checkbox data-testid="checkbox" size="small" color="success" checked 
    label="CheckBox1"/>)

}

describe("<Checkbox />", ()=>{

    test("CheckBox is rendered", async() => {
        const checkboxx = renderCheckbox();
        // console.log("checkboxx",checkboxx )
        expect(await screen.getByTestId('checkbox')).toBeInTheDocument()
        // expect(await screen.getByLabelText('CheckBox1')).toBeChecked()
    })

    
})