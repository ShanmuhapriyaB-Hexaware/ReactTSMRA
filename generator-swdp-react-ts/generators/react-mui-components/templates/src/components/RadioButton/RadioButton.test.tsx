import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import RadioButton from './RadioButton'

const Items=[
    {"_id":1, value:"female", label:"Female" },
    {"_id":2,value:"male", label:"Male"},
    {"_id":3,value:"'transgender", label:"Transgender"}
  ]

function renderRadioButton(props: any={}){

    return render(<RadioButton label="Gender"
    items={Items} 
    itemLabel="gender"
    itemValue="_id"
    size="small"
    color="secondary"
    value='female'/>)
}

describe("<RadioButton />",()=>{

    test("renders the radio button component", async () => {
        const { getByTestId, getByRole } = renderRadioButton();
        expect(await screen.getByRole('radiogroup')).toBeInTheDocument()   
    })

   
})
