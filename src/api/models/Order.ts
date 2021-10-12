import { Customer } from "./Customer";
import { OrderStatus } from "./OrderStatus";
import { FoodItem } from "./FoodItem";
import { FoodItemExtra } from "./FoodItemExtra";
import { OrderFoodItem } from "./OrderFoodItem";
import { PromotionalCode } from "./PromotionalCode";


export interface Order {
    id:number
    orderedAt:Date
    desiredDeliveryDateTime:Date
    orderIdentifier:string
    note:string
    totalPrice:number
    isCash:boolean
    customer:Customer
    promotionalCode:PromotionalCode
    orderStatus:OrderStatus //TODO если будет сбой то тут
    orderFoodItems:OrderFoodItem[]
    foodItems:FoodItem[]
    foodItemExtras:FoodItemExtra[]
}