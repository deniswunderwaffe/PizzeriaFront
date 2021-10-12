import {Order} from "../api/models/Order";
import {CreateOrder} from "../api/models/create_models/CreateOrder";



const BASE_URL =  "https://localhost:5001/api/";


export const getOrders = async (token,pageSize:number = 10,pageNumber:number = 1) =>{
    let url = BASE_URL + `Order?PageNumber=${pageNumber}&PageSize=${pageSize}`
    try {
        const response = await fetch(
            url,
            {
                method:"GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
        
    } catch (error:any) {
        console.log(error.message);
    }
}
export const getOrderById = async (token,id) =>{
    try {
        const response = await fetch(
            BASE_URL + "Order/" + {id},
            {
                method:"GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const responseData = await response.json();
        return responseData;
        
    } catch (error:any) {
        console.log(error.message);
    }
}
export const addOrder = async (order:CreateOrder,token)=>{
    try {
        const response = await fetch(BASE_URL + "Order", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(order),
        })
        const responseData = await response.json();
        return responseData;
        
    } catch (error:any) {
        console.log(error.message);
    }
}
export const updateOrder = async (order:Order,token)=>{
    try {
        await fetch(BASE_URL + "Order/" + order.id, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(order),
        })
        
    } catch (error:any) {
        console.log(error.message);
    }
}
export const deleteOrder = async (id,token) =>{
    try {
        await fetch(BASE_URL + "Order/"+ id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        
    } catch (error:any) {
        console.log(error.message);
    }
}
export const patchOrderStatus = async (id:number,statusCode:number,token)=>{
    const patchDoc = [
        {
          "path": "/orderStatusId",
          "op": "replace",
          "value": statusCode
        }
      ]
    try {
        await fetch(BASE_URL + "Order/" + id, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(patchDoc),
        })
        
    } catch (error:any) {
        console.log(error.message);
    }
}