import React, { FC } from 'react'
import { Divider, Grid, Typography } from '@mui/material';
import FoodItemComponent from './FoodItemComponent';
import { FoodItem } from '../../api/models/FoodItem';

interface PizzaProps {
    pizzas: FoodItem[]
}
const Pizzas: FC<PizzaProps> = ({ pizzas }) => {
    return (
        <React.Fragment>
            <Typography variant="h3" component="h1" gutterBottom>
                Pizzas
            </Typography>
            <Divider variant="middle" sx={{ mb: "15px" }} />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    pizzas.map((item) => (
                        <FoodItemComponent key={item.id} foodItem={item} />
                    ))
                }
            </Grid>
        </React.Fragment>
    )
}

export default Pizzas
