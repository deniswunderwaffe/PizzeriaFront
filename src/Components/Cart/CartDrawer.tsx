import { Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { CartContext } from "../../views/Catalog";
import { Grid } from '@mui/material';
import FoodItemInForm from "../Forms/FoodItemInForm";
import { Link, useRouteMatch } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';



const CartDrawer = () => {
    const context = useContext(CartContext);
    let match = useRouteMatch();

    return (
        <Drawer
            anchor="right"
            open={context.isCartOpen}
            onClose={context.closeCart}
            sx={{ alignItems: "center" }}

        >
            <List sx={{ width: '300px', marginLeft: '50px', marginRight: '30px' }}>
                <ListItem>
                    <ListItemIcon>
                        <ShoppingBasket />
                    </ListItemIcon>
                    <ListItemText primary="Cart" />
                </ListItem>
                <Divider />

                {!context.items.length ? (
                    <ListItem>Cart is empty</ListItem>
                ) : (
                    <>
                        <ListItem>
                            <Typography variant = "h6" sx={{flexGrow:1}}>
                                Total price:{context.totalPrice}$
                            </Typography>
                            <Link to={`${match.path}/order`}>
                                <Button
                                    variant={"contained"}
                                    onClick={context.closeCart}>
                                    Proceed
                                </Button>
                            </Link>
                        </ListItem>
                        <Divider />

                        <Grid container columns={1}>
                            {context.items.map((item) => (
                                <FoodItemInForm key={item.name} foodItem={item} />
                            ))}
                        </Grid>
                    </>
                )}
            </List>
        </Drawer>
    )
}

export default CartDrawer