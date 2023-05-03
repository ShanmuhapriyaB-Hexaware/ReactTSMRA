import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

const ReactTabs = (props: any) => {

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                {...props}
            >
            </Tabs>
        </Box>
    );
};

export default ReactTabs
