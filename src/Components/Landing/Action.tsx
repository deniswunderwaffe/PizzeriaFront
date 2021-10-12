import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Collapse } from '@material-ui/core';



interface cardInfo {
    imagePath: string,
    action: string,
    checked: boolean
}
const Action: FC<cardInfo> = ({ imagePath, action, checked }) => {

    return (
        <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <Typography variant="h1" component="h1" align="center" sx={{ color: "white", textShadow: "2px 2px black" }}>
                {action}
            </Typography>
        </Collapse>
    );
}
export default Action;