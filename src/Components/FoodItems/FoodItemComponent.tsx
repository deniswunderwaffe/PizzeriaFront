import React, { FC, useContext } from 'react'
import { FoodItem } from '../../api/models/FoodItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CartContext } from '../../views/Catalog';


export interface FoodItemProps {
    foodItem: FoodItem
}

const FoodItemComponent: FC<FoodItemProps> = ({ foodItem }) => {

    const context = useContext(CartContext);
    foodItem.quantity = 1; //TODO Изменить логику 
    return (
        <Grid item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 280, boxShadow: "none" }}>
                <CardMedia
                    component="img"
                    height="280"
                    image={process.env.PUBLIC_URL + "/assets/pizzas/" + foodItem.id + ".png"}
                    alt="foodItem"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h4">
                        {foodItem.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h5">
                        {foodItem.foodCategoryId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {foodItem.description.substring(0, 40) + "...."}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Typography gutterBottom variant="h6" component="h6" sx={{ flexGrow: 1 }}>
                        {"From " + foodItem.price + "$"}
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => context.addToCart(foodItem)} >Add to Cart
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default FoodItemComponent
