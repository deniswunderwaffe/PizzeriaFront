import { Customer } from "./Customer";
import { OrderStatus } from "./OrderStatus";
import { FoodItem } from "./FoodItem";
import { FoodItemExtra } from "./FoodItemExtra";
import { OrderFoodItem } from "./OrderFoodItem";


export interface Order {
    id:number
    orderedAt:Date
    desiredDeliveryDateTime:Date
    orderIdentifier:string
    note:string
    totalPrice:number
    isCash:boolean
    customer:Customer
    promotionalCode:string
    orderStatus:OrderStatus[]
    orderFoodItems:OrderFoodItem[]
    foodItems:FoodItem[]
    foodItemExtras:FoodItemExtra[]
}