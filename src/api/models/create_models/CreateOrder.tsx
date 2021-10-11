import { OrderFoodItem } from "../OrderFoodItem";
import { OrderFoodItemExtra } from "../OrderFoodItemExtra";

export interface CreateOrder{
    desiredDeliveryDateTime:Date
    note:string
    isCash:boolean
    totalPrice:number
    customerId:number
    promotionalCodeId?:number
    orderFoodItems:OrderFoodItem[]
    orderFoodItemExtras:OrderFoodItemExtra[]
}