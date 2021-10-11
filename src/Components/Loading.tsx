import React from "react";
import { Box } from '@mui/material'

const loadingImg =
    "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const style = {
    position: 'absolute' as 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
};

const Loading = () => (
    <Box sx={style}>
        <div className="spinner">
            <img src={loadingImg} alt="Loading..." />
        </div>
    </Box>
);

export default Loading;