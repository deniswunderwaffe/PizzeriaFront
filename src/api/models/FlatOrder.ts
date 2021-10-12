export interface FlatOrder {
    id:number
    orderedAt:Date
    desiredDeliveryDateTime:Date
    orderIdentifier:string
    note:string
    totalPrice:number
    isCash:boolean
    customerName:string
    customerAddress:string
    customerPhone:string
    promotionalCode:string
    orderStatus:string 
}