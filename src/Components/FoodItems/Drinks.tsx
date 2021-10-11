import React,{FC} from 'react'
import { Grid, Typography,Divider } from '@mui/material';
import FoodItemComponent from './FoodItemComponent';
import { FoodItem } from '../../api/models/FoodItem';

interface DrinkProps{
    drinks:FoodItem[]
}

const Drinks:FC<DrinkProps> = ({drinks}) => {
    return (
        <React.Fragment>
            <Typography variant="h3" component="h1" gutterBottom>
                Drinks
            </Typography>
            <Divider variant="middle" sx ={{mb:"15px"}} />

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    drinks.map((item) => (
                        <FoodItemComponent key={item.id} foodItem={item} />
                    ))
                }
            </Grid>
        </React.Fragment>
    )
}

export default Drinks
