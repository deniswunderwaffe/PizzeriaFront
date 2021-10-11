import React, { useState, useEffect, FC, useContext, useRef, } from 'react';
import { Order } from '../api/models/Order';
import { CreateOrder } from '../api/models/create_models/CreateOrder';
import { useAuth0 } from "@auth0/auth0-react";
import { getOrders, addOrder, getOrderById, updateOrder, deleteOrder, patchOrderStatus } from '../services/OrderService';
import { Divider, Typography, Box, TextField } from '@mui/material';
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import { StatusCodes } from '../utils/StatusCodes';
import ClientDetails from './ClientDetails';
import { FoodItem } from '../api/models/FoodItem';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import FoodItemInForm from '../Components/Forms/FoodItemInForm';
import { CartContext } from './Catalog';
import CartDrawer from '../Components/Cart/CartDrawer';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import OrderProccess from './OrderProccess';
import { validateCode } from '../services/PromotionalCodeService';
import PromotionalCodeResponse from '../api/models/PromotionalCodeResponse';


interface OrderFormProps {
    foodItems: FoodItem[],
    isCodeDisabled: boolean,
    setCodeDisabled: () => void
}
const OrderForm: FC<OrderFormProps> = ({ foodItems, isCodeDisabled, setCodeDisabled }) => {

    let match = useRouteMatch();
    const { getAccessTokenSilently } = useAuth0();
    const [orders, setOrders] = useState<Order[]>([]);
    const [promotionalCode,setPromotionalCode] = useState(0);
    const promotionalCodeRef = useRef<HTMLInputElement>(null);
    const context = useContext(CartContext);



    useEffect(() => {
        getOrdersSecure();
        context.clearExtras();
    }, [])
    const getOrdersSecure = async () => {
        try {
            const token = await getAccessTokenSilently();
            const responseData = await getOrders(token);
            setOrders(responseData);
        } catch (error) {
        }
    };

    const promotionalCodeHandler = async () => {
        const code = promotionalCodeRef.current!.value;
        const token = await getAccessTokenSilently();
        const responseData: PromotionalCodeResponse = await validateCode(token, code);
        if (responseData.isValid) {
            setCodeDisabled();
            context.addDiscount(responseData.discount);
            setPromotionalCode(responseData.id as number);
        }
    }

    const deleteOrderHandler = async () => {
        //const token = await getAccessTokenSilently();
        //await deleteOrder(6,token);
    }
    const patchOrderStatusHandler = async () => {
        const token = await getAccessTokenSilently();
        await patchOrderStatus(1, StatusCodes.Delivered, token);
    }
    return (

        <Switch>
            <Route path={`${match.path}/orderProccess`}>
                <OrderProccess codeId = {promotionalCode}/>
            </Route>
            <Route path={match.path}>
                <Link to={`/catalog`}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, ml: 2 }}
                        onClick={context.closeCart}
                    >
                        <KeyboardReturnIcon />
                    </IconButton>
                </Link>
                <Container
                    sx={{ mt: "2rem" }}
                >
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h3" component="h1" gutterBottom sx={{ flexGrow: 1 }}>
                            Total price:
                        </Typography>
                        <Typography variant="h3" component="h1" gutterBottom>
                            {context.totalPrice + "$"}
                        </Typography>
                    </Box>
                    <Divider variant="middle" sx={{ mb: "15px" }} />
                    {!context.items.length ? (
                        <Typography variant="h3" component="h1" gutterBottom sx={{ flexGrow: 1 }}>
                            Order is empty :(
                        </Typography>
                    ) :
                        (<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {
                                foodItems.map((item) => (
                                    <FoodItemInForm key={item.id} foodItem={item} />
                                ))
                            }
                        </Grid>)}
                    <Divider variant="middle" sx={{ mb: "15px" }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <TextField
                            disabled={isCodeDisabled}
                            inputRef={promotionalCodeRef}
                            id="outlined-basic"
                            label="Promotional code"
                            variant="outlined" />
                        <Button
                            disabled={isCodeDisabled}
                            variant="outlined"
                            sx={{ ml: 2 }}
                            onClick={promotionalCodeHandler}>
                            Check
                        </Button>
                    </Box>
                    <Divider variant="middle" sx={{ mb: "15px", mt: "15px" }} />
                    <Link to={`${match.path}/orderProccess`}>
                        <Button sx={{ width: "100%" }}
                            variant="contained">Place an order
                        </Button>
                    </Link>
                </Container>
                <CartDrawer />
            </Route>
        </Switch>

    )
}

export default OrderForm
