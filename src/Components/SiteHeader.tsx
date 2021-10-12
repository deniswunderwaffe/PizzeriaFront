import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { ShoppingBasket } from '@material-ui/icons';
import { FC } from 'react';
import { Link } from "react-router-dom";
import LogoutButton from '../auth/logout-button';
import { useAuth0 } from '@auth0/auth0-react';


interface SiteHeaderProps {
  openCart: () => void;
  itemsCount: number;
}
const SiteHeader: FC<SiteHeaderProps> = ({ openCart, itemsCount }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            <Link to={`/catalog`} style={{textDecoration:"none",color: "inherit"}}>
              Pizzeria
            </Link>
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openCart}
          >
            <Badge
              color="secondary"
              badgeContent={itemsCount}>
              <ShoppingBasket />
            </Badge>
          </IconButton>
          <LogoutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SiteHeader;