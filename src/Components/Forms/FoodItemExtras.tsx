import { useAuth0 } from '@auth0/auth0-react';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import React, { FC, useContext, useEffect, useState } from 'react'
import { FoodItemExtra } from '../../api/models/FoodItemExtra';
import CheckIcon from '@mui/icons-material/Check';
import { getFoodItemExtraForFoodItem } from '../../services/FoodItemExtraService';
import { CartContext } from '../../views/Catalog';

interface FoodItemExtraProps {
  foodId: number
}
const FoodItemExtras: FC<FoodItemExtraProps> = ({ foodId }) => {
  const [extras, setExtras] = useState<FoodItemExtra[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const context = useContext(CartContext);

  useEffect(() => {
    const loadAll = async () => {
      await getExtrasSecure(foodId);
    }
    loadAll(); 
  }, [])

  const getExtrasSecure = async (id: number) => {
    try {
      const token = await getAccessTokenSilently();
      const responseData = await getFoodItemExtraForFoodItem(token, id);
      setExtras(responseData);
    } catch (error) {
    }
  };
  return (
    <AvatarGroup>
      {extras.map((extra) => (
        <Tooltip title={extra.name} key={extra.id}>
          <IconButton>
          <Checkbox icon={<Avatar
              src={process.env.PUBLIC_URL + "/assets/extras/" + extra.id + ".png"}
              alt="extra"
             />} 
             checkedIcon={<CheckIcon/>}
             onChange ={(e)=>{context.handleExtra(extra,e.target.checked)}} />
          </IconButton>
        </Tooltip>
      ))}
    </AvatarGroup>
  )


}

export default FoodItemExtras
