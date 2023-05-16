import React, { PropsWithChildren } from 'react'
import { Card } from '@mui/material'
import { styled, Box } from '@mui/system'

const CardRoot = styled(Card)(() => ({
    height: '100%',
    padding: '20px 24px'
}))

const CardTitle = styled('div')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: "16px",
}))

type IProps = {
    title: string;
    subtitle: string;
} & PropsWithChildren;

const SimpleCard = ({ children, title, subtitle }: IProps) => {
    return (
        <CardRoot elevation={6}>
            <CardTitle>
                {title}
            </CardTitle>
            {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
            {children}
        </CardRoot>
    )
}

export default SimpleCard;
