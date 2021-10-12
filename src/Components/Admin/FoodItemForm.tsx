import { useAuth0 } from '@auth0/auth0-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography, Divider } from '@mui/material'
import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { addFoodItem } from '../../services/FoodItemService';

const schema = yup.object().shape({
    name: yup.string().max(50).required(),
    description: yup.string().max(200).required(),
    price: yup.number().min(1).max(999).required(),
});
const categories = [
    {
        value: 1,
        label: 'Pizza',
    },
    {
        value: 2,
        label: 'Drink',
    },
    {
        value: 3,
        label: 'Snack',
    },
];

const FoodItemForm = () => {
    const { register, handleSubmit, formState: { errors }, reset }: any = useForm({
        resolver: yupResolver(schema),
    });
    const { getAccessTokenSilently } = useAuth0();
    const [category, setCategory] = React.useState(1);
    const [path, setPath] = React.useState(0);
    const [isSent, setSent] = React.useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(parseInt(event.target.value));
    };

    const addFoodItemHandler = async (data) => {
        const pizza = data;
        pizza.foodCategoryId = category;
        const token = await getAccessTokenSilently();
        const response = await addFoodItem(data, token);
        setPath(response.id);
        setSent(true);
        reset();
    }

    return (
        <div>
            <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4 }}>
                Create new food Item
            </Typography>
            <Divider variant="middle" sx={{ mb: "15px" }} />
            <form onSubmit={handleSubmit(addFoodItemHandler)}>
                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 25
                }}>
                    <TextField
                        {...register("name")}
                        id="outlined-basic"
                        label="Name"
                        multiline
                        maxRows={4}
                        variant="outlined" />
                    <Typography variant="caption" component="p" color="red">
                        {errors.name?.message}
                    </Typography>
                    <TextField
                        {...register("price")}
                        id="outlined-basic"
                        label="Price"
                        type="number"
                        variant="outlined" />
                    <Typography variant="caption" component="p" color="red">
                        {errors.price?.message}
                    </Typography>
                    <TextField
                        {...register("description")}
                        id="outlined-basic"
                        label="Description"
                        multiline
                        maxRows={4}
                        variant="outlined" />
                    <Typography variant="caption" component="p" color="red">
                        {errors.description?.message}
                    </Typography>
                    <TextField
                        id="outlined-select-foodCategoryId"
                        select
                        label="Category"
                        value={category}
                        onChange={handleChange}
                        helperText="Please select category"
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Typography variant="caption" component="p" color="red">
                        {errors.foodCategoryId?.message}
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
            {isSent ? <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4 }}>
                        Set image path {path}
                    </Typography> : <React.Fragment/>
                    }
        </div>
    )
}

export default FoodItemForm
