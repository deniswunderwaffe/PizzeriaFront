import React,{FC,useState,useEffect} from 'react';
import {AppBar, IconButton, Toolbar,Collapse} from "@material-ui/core";
import {Subject,ArrowDropDownCircleOutlined} from "@material-ui/icons";
import {Link as Scroll} from 'react-scroll';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import {useStyles} from './HeaderStyles'

const Header:FC<any> = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <div className={classes.root} id="header">
            <AppBar className={classes.appbar}>
                <Toolbar className={classes.appbarContainer}>
                    <LocalPizzaIcon/>
                    <h1 className={classes.appbarTitle}>Pizzeria</h1>
                    <IconButton>
                        <Subject className={classes.icon}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Collapse  
            in={checked}
            {...(checked ? { timeout: 1000 } : {})}
            collapsedSize={50}
            >
                <div className={classes.centerText}>
                <h1 className ={classes.title}>
                    The Pizza you always<br/>WANTED
                </h1>
                <Scroll to = "actions" smooth = {true}>
                    <IconButton>
                        <ArrowDropDownCircleOutlined className ={classes.moveDownIcon}/>
                    </IconButton>
                </Scroll>
                </div>
            </Collapse>
        </div>
    );
};

export default Header;