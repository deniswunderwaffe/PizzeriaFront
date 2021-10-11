import React from 'react';
import { CssBaseline, makeStyles } from "@material-ui/core";
import BgImage from "../assets/bg.png";
import Header from "../Components/Landing/Header";
import Actions from '../Components/Landing/Actions';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${BgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        boxShadow: "inset 0px 0px 20px 10px rgba(0,0,0,0.9)"
    },
}))
const LandingPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header />
            <CssBaseline />
            <Actions />
        </div>
    )
}

export default LandingPage
