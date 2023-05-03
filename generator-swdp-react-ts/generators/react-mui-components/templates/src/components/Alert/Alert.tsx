import React from 'react';
import { Alert, Stack } from '@mui/material';

const ReactAlert = (props: any) => {

    return (
        <Stack sx={{ width: '100%' }}>
            <Alert {...props} />
        </Stack>
    );
};

export default ReactAlert;