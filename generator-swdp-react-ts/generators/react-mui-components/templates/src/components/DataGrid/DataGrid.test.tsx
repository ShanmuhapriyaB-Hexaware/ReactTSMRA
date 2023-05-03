import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import DataGrid from './DataGrid'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function renderGrid(props: any={}){
    function DataGridTitle() {
        return(
            <Box style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h5">Users</Typography>
            </Box>
        )}
    const columns = [
        { field: '_id', headerName:'id', flex: 0.1 },
        { field: 'name', headerName: 'name', flex: 1 },
        { field: 'username', headerName: 'username', flex: 1 },
        { field: 'email', headerName: 'email', flex: 1 }
      ];

    return render(<DataGrid {...props}
            sx={{ height: 300, width: '100%', borderColor: 'primary.light' }}  
            url="userData.json" 
            columns={columns}
            colId="_id"
            paginationModel = {{ pageSize: 2, page:1}}
            pageSizeOptions={[1,2,5]}
            components={{Toolbar: DataGridTitle}}

    />)
}


describe("<DataGrid />", () => {
    test("renders the data grid component", async () => {
        const { getByTestId, getByRole } = renderGrid();
        expect(await screen.getByRole('grid')).toBeInTheDocument()   
    });
  });
  