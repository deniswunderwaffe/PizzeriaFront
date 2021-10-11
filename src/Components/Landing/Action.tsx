import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Collapse } from '@material-ui/core';



interface cardInfo {
    imagePath: string,
    action: string,
    checked: boolean
}
const Action: FC<cardInfo> = ({ imagePath, action, checked }) => {

    return (
        <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <Card sx={{
                maxWidth: 700,
                margin: 20,
                background: 'rgba(0,0,0,0)',
                boxShadow: 'none',
                transition: "transform 0.15s ease-in-out",
                "&:hover": { transform: "scale3d(1.05, 1.05, 1)" }
            }}>
                <CardActionArea>
                    <CardContent >
                        <Typography variant="h2" component="div" align="center" sx={{ color: "white", textShadow: "2px 2px black" }}>
                            {action}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Collapse>
    );
}
export default Action;