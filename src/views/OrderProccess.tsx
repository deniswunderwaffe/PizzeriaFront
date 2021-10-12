import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, TextField, Divider } from '@mui/material'
import React, { FC, useContext, useRef, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Alert } from "@mui/material"
import { Snackbar } from "@mui/material"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from '@mui/material';
import { CartContext } from './Catalog';
import NewCustomerModal from '../Components/Forms/NewCustomerModal';
import { getCustomerByPhone } from '../services/CustomerService';
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
    const [value, setValue] = React.useState(false);

    const closeModalHandler = () => {
        setOpenModal(false);
    }
    const handleChange = (event) => {
        setValue(event.target.value);
      };
    const afterSubmitLogic = () => {
        setSent(true);
        context.clearCart();
        setTimeout(() => history.push('/catalog'), 4000);
    }

    const onSubmitHandler = async (data) => {
        let desiredDateToTransfer = new Date();
        const desiredDate = deliveryRef.current!.value;

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
        await addOrder(order, token);
    }

    const customerHandler = async () => {
        const phone = phoneRef.current!.value;
        const token = await getAccessTokenSilently(); //TODO должен быть по телефону а тут айди
        const response = await getCustomerByPhone(token, phone);

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
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    <label htmlFor="delivery-time" style={{ fontFamily: 'Roboto' }}>
                        (Leave it if you want delivery as fast as possible)<br />Choose a time for your delivery:
                    </label>
                    <input
                        style={{ height: "52px", width: "221px", fontSize: "1.3em" }}
                        ref={deliveryRef}
                        type="datetime-local" id="delivery-time"
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
                        variant="outlined" />
                    <FormControl component="fieldset" sx={{mr:"100px"}}>
                        <FormLabel component="legend">Payment options</FormLabel>
                        <RadioGroup
                            aria-label="payment"
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel {...register("isCash")} value={false} control={<Radio />} label="Card" />
                            <FormControlLabel {...register("isCash")} value={true} control={<Radio />} label="Cash" />
                        </RadioGroup>
                    </FormControl>
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
                >Order is placed successefuly!<br /> Redirecting...
                </Alert>
            </Snackbar>
        </Container >
    )
}

export default OrderProccess
