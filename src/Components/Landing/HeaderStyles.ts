
import {createStyles, makeStyles, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    appbar: {
        background: "none",
        boxShadow: 'none'
    },
    appbarContainer: {
        width: "95%",
        margin: "0 auto"
    },
    appbarTitle: {
        flexGrow: 1 // разводит элементы по сторонам
    },
    icon: {
        color: "white",
        fontSize: "2rem"
    },
    centerText: {
        textAlign: 'center',
    },
    title: {
        color: '#fff',
        fontSize: '4.5rem',
        textStroke: "0.5px black"
    },
    moveDownIcon:{
        fontSize:"3rem",
        color: '#fff',
    }
}));
export { useStyles };