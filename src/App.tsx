import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Components/Loading";
import Catalog from "./views/Catalog"
import LandingPage from './views/LandingPage';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from './auth/protected-route';
import "./App.css";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});


function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        {/* <ProtectedRoute path="/catalog" component={Catalog}/> */}
        <Route path="/catalog">
          <Catalog />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;