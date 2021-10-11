import React, { FC } from 'react'
import { FoodItem } from '../../api/models/FoodItem'

interface CartItemProps {
    cartItem: FoodItem
}
const CartItemComponent: FC<CartItemProps> = ({ cartItem }) => {
    return (
        <li>
            {cartItem.name} {cartItem.price}руб x{cartItem.quantity}
            <button
                onClick={() => null}
            >
                Удалить из корзины
            </button>
        </li>
    )
}

export default CartItemComponent
