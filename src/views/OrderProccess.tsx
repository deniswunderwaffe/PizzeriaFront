import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, TextField, Divider } from '@mui/material'
import React, { FC, useContext, useRef, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { Alert } from "@mui/material"
import { Snackbar } from "@mui/material"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Typography } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { CartContext } from './Catalog';
import NewCustomerModal from '../Components/Forms/NewCustomerModal';
import { getCustomerById } from '../services/CustomerService';
import { Customer } from '../api/models/Customer';
import { CreateOrder } from '../api/models/create_models/CreateOrder';
import { addOrder } from '../services/OrderService';


const schema = yup.object().shape({
    note: yup.string().max(100),
    isCash: yup.boolean(),
    deliveryTime: yup.string().max(100),
});

interface OrderProccessProps {
    codeId: number
}
const OrderProccess: FC<OrderProccessProps> = ({ codeId }) => {
    const { register, handleSubmit, formState: { errors }, reset }: any = useForm({
        resolver: yupResolver(schema),
    });

    const { getAccessTokenSilently } = useAuth0();
    let history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const deliveryRef = useRef<HTMLInputElement>(null);
    const [isCustomer, setIsCustomer] = useState(false);
    const [isSent, setSent] = useState(false);
    const [customer, setCustomer] = useState<Customer>({} as Customer);
    const context = useContext(CartContext);

    const closeModalHandler = () => {
        setOpenModal(false);
    }

    const afterSubmitLogic = () => {
        setSent(true);
        context.clearCart();
        setTimeout(()=>history.push('/catalog'), 4000);
    }

    const onSubmitHandler = async (data) => {
        var desiredDateToTransfer = new Date();
        var desiredDate = deliveryRef.current!.value;

        if (desiredDate === "") {
            // если нету желаемой даты стандарт через 3 часа
            desiredDateToTransfer.setHours(desiredDateToTransfer.getHours() + 3);
        }
        else if (desiredDate.length > 0) {
            desiredDateToTransfer = new Date(desiredDate);
        }
        const order: CreateOrder = {
            desiredDeliveryDateTime: desiredDateToTransfer,
            note: data.note,
            totalPrice: context.totalPrice,
            isCash: data.isCash,
            customerId: customer.id,
            orderFoodItems: context.items.map(x => ({ foodItemId: x.id, quantity: x.quantity })),
            orderFoodItemExtras: context.extras.map(x => ({ foodItemExtraId: x.id }))
        };
        if (codeId !== 0) {
            order.promotionalCodeId = codeId
        }
        await sendOrder(order);
        reset();
        afterSubmitLogic();
    }

    const sendOrder = async (order: CreateOrder) => {
        const token = await getAccessTokenSilently();
        addOrder(order, token);
    }

    const customerHandler = async () => {
        const phone = phoneRef.current!.value;
        const token = await getAccessTokenSilently(); //TODO должен быть по телефону а тут айди
        const response = await getCustomerById(token, parseInt(phone));

        if (!response.status) {
            addressRef.current!.value = response.address;
            setCustomer(response);
            setIsCustomer(true);
        }
        else if (response.status === 404) {
            setOpenModal(true)
            console.log("qwe"); //надо предложить зарегаться
        }
        else {
            alert("BAN");
            setSent(true);
        }
    }
    const customerCreatedHandler = (customer) => {
        setCustomer(customer);
        setIsCustomer(true);
        addressRef.current!.value = customer.address;
    }
    return (
        <Container
            sx={{ mt: "2rem" }}
        >
            {isCustomer ? (
                <Typography variant="h3" component="h1" gutterBottom>
                    Hello {customer.name}
                </Typography>
            ) :
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TextField
                        inputRef={phoneRef}
                        id="outlined-basic"
                        label="Phone"
                        variant="outlined" />
                    <Button
                        variant="outlined"
                        sx={{ ml: 2 }}
                        onClick={customerHandler}
                    >
                        Enter
                    </Button>
                    <NewCustomerModal onCustomerCreated={customerCreatedHandler} openModal={openModal} onClose={closeModalHandler} />
                </Box>
            }
            <Divider variant="middle" sx={{ mb: "15px", mt: "15px" }} />
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 25
                }}>
                    <label htmlFor="delivery-time">(Leave it if you want delivery as fast as possible)<br />Choose a time for your delivery:</label>
                    <input ref={deliveryRef} type="datetime-local" id="delivery-time"
                        name="delivery-time"
                    />
                    <TextField
                        {...register("note")}
                        id="outlined-basic"
                        label="Note"
                        multiline
                        maxRows={4}
                        variant="outlined" />
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        inputRef={addressRef}
                        disabled
                        id="outlined-basic"
                        label="Address"
                        maxRows={4}
                        variant="outlined" />
                    <p>{errors.address?.message}</p>
                    <label htmlFor="isCash">With Cash</label>
                    <Checkbox id="isCash" {...register("isCash")} />

                    <Button
                        disabled={!isCustomer || isSent}
                        variant="contained"
                        sx={{ ml: 2 }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={isSent}
                autoHideDuration={1500}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                key={"bottom right"}
            >
                <Alert
                    severity="success"
                >Order is placed successefuly!<br/> Redirecting...
                </Alert>
            </Snackbar>
        </Container >
    )
}

export default OrderProccess
