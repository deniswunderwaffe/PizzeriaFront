import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Components/Loading";
import Catalog from "./views/Catalog"
import LandingPage from './views/LandingPage';
import { Switch, Route} from "react-router-dom";
import Admin from './views/Admin';
import "./App.css";
import { createTheme, ThemeProvider} from '@mui/material/styles';
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
    <Switch>
      <Route path="/catalog">
        <ThemeProvider theme={theme}>
          <Catalog />
        </ThemeProvider>
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/">
        <LandingPage />
      </Route>
    </Switch>
  );
}

export default App;