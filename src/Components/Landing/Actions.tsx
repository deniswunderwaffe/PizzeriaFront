import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from "@material-ui/core";
import Action from './Action';
import CustomerImage from '../../assets/customer.png';
import useWindowPosition from '../../hooks/useWindowPosition';
import LoginButton from "../../auth/login-button"
import { NavLink } from "react-router-dom";
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
        <div className={classes.root}>
          {!isAuthenticated ? <LoginButton /> :
            (
              <>
                <NavLink to="/catalog" style={{ textDecoration: "none" }}>
                  <Action action="Enter" imagePath={CustomerImage} checked={checked} />
                </NavLink>
              </>)
          }
        </div>
      </div>
    </React.Fragment>);
}
export default Actions;