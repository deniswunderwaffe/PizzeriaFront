import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from "@material-ui/core";
import Action from './Action';
import AdminImage from '../../assets/admin.png';
import CustomerImage from '../../assets/customer.png';
import useWindowPosition from '../../hooks/useWindowPosition';
import CodeIcon from '@mui/icons-material/Code';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LoginButton from "../../auth/login-button"
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
const Actions: FC<any> = () => {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  const { isAuthenticated } = useAuth0();

  return (
    <React.Fragment>
      <div style={{ minHeight: "80vh", }} id="actions">
        <Typography variant="h2" component="div" align="center" sx={{ color: "white", textShadow: "2px 2px black" }}>
          Enter as
        </Typography>
        <Divider sx={{
          width: "70%",
          margin: "60px auto",
          border: 0,
          height: "1px",
          background: "#333",
          backgroundImage: "linear-gradient(to right, #ccc, #333, #ccc)",
        }} />
        <div className={classes.root}>
          {!isAuthenticated ? <LoginButton /> :
            (
              <>
                <NavLink to="/admin" style={{ textDecoration: "none" }}>
                  <Action action="Admin" imagePath={AdminImage} checked={checked} />
                </NavLink>
                <NavLink to="/catalog" style={{ textDecoration: "none" }}>
                  <Action action="Customer" imagePath={CustomerImage} checked={checked} />
                </NavLink>
              </>)
          }
        </div>
      </div>
    </React.Fragment>);
}
export default Actions;