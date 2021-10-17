import React, { useContext } from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Divider } from '@mui/material'
import { getHelp } from '../../services/FoodItemService';
import { CartContext } from '../../views/Catalog';



const schema = yup.object().shape({
    personCount: yup.number().positive().required(),
    vegetarianCount: yup.number().required(),
    diabeticCount: yup.number().required(),


});

const OrderHelp = () => {
    const { register, handleSubmit, formState: { errors } }: any = useForm({
        resolver: yupResolver(schema),
    });
    const context = useContext(CartContext);

    const onSubmitHandler = async (data) => {
        const responseData = await getHelp(data);
        for (const i of responseData) {
            i.quantity = 1;
        }
        context.addArrayToCart(responseData);
    }
    return (
        <Box sx={{mb:2}}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
                Seems you need help<br />Fill the form please
            </Typography>
            <Divider variant="middle" sx={{ mb: "15px" }} />
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 25
                }}>
                    <TextField
                        {...register("personCount")}
                        id="outlined-basic"
                        label="Persons"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined" />
                    <Typography variant="caption" component="p" color="red">
                        {errors.persons?.message}
                    </Typography>
                    <TextField
                        {...register("vegetarianCount")}
                        id="outlined-basic"
                        label="Vegetarians"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined" />
                    <Typography variant="caption" component="p" color="red">
                        {errors.vegetarianCount?.message}
                    </Typography>
                    <TextField
                        {...register("diabeticCount")}
                        id="outlined-basic"
                        label="Diabetics"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined" />
                    <Typography variant="caption" component="p" color="red">
                        {errors.diabeticCount?.message}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ ml: 2 }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default OrderHelp
