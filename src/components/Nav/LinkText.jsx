import React from 'react'
import { Button } from '@mui/material'

const LinkText = React.forwardRef(({ children, ...props }, ref) => {
    return (
        <Button
            ref={ref}
            {...props}
            color="inherit"
            sx={{                
                color: 'btnDark',
                fontFamily: 'circular-bold',
                fontSize: '16px'
            }}>{children}</Button>
    )
})


export default LinkText