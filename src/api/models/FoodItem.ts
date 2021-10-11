import { FoodCategory } from "./FoodCategory";

export interface FoodItem{
    id:number
    name:string
    price:number
    description:string
    foodCategoryId:number
    quantity:number
}