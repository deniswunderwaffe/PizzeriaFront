import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import React, { FC, useContext } from 'react'
import { FoodItem } from '../../api/models/FoodItem'
import Button from '@mui/material/Button';
import { CartContext } from '../../views/Catalog';
import FoodItemExtras from './FoodItemExtras';

export interface FoodItemProps {
    foodItem: FoodItem
}

const FoodItemInForm: FC<FoodItemProps> = ({ foodItem }) => {
    const context = useContext(CartContext);
    
    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card sx={{ maxWidth: 250, boxShadow: "none" }}>
                <CardMedia
                    component="img"
                    image={process.env.PUBLIC_URL + "/assets/pizzas/" + foodItem.id + ".png"}
                    alt="foodItem"
                    sx={{ width: '100%', objectFit: 'cover' }}
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
                    <Typography gutterBottom variant="h6" component="h6">
                        Quantity : {foodItem.quantity}
                    </Typography>
                </CardActions>
                <CardActions>
                   <FoodItemExtras foodId = {foodItem.id}/>
                </CardActions>
                <CardActions>
                    <IconButton aria-label="Example" onClick={() => context.addToCart(foodItem)}>
                        <AddIcon />
                    </IconButton>
                    <IconButton aria-label="Example" onClick={() => context.decreaseFromCart(foodItem.id)}>
                        <RemoveIcon />
                    </IconButton>
                    <Button
                        sx={{ flexGrow: 1 }}
                        color="error"
                        onClick={() =>context.removeFromCart(foodItem.id)}>
                        Remove
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default FoodItemInForm
