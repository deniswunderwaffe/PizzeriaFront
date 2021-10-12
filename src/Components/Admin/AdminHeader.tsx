import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SecurityIcon from '@mui/icons-material/Security';
import { Link } from "react-router-dom";
import LogoutButton from '../../auth/logout-button';

const AdminHeader = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                        <Link to={`/admin`} style={{ textDecoration: "none", color: "inherit" }}>
                            Admin Page
                        </Link>
                    </Typography>
                    <SecurityIcon />
                    <LogoutButton />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default AdminHeader;
