import {Customer} from "../api/models/Customer";


const BASE_URL =  "https://localhost:5001/api/";


export const getCustomers = async (token) =>{
    try {
        const response = await fetch(
            BASE_URL + "Customer",
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
export const getCustomerByPhone = async (token,phone:string) =>{
    try {
        const response = await fetch(
            BASE_URL + "Customer/phone/?phone=" + phone,
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
export const addCustomer = async (customer:Customer,token)=>{
    try {
        const response = await fetch(BASE_URL + "Customer", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(customer),
        })
        const responseData = await response.json();
        return responseData;
        
    } catch (error:any) {
        console.log(error.message);
    }
}
export const updateCustomer = async (customer:Customer,token)=>{
    try {
        await fetch(BASE_URL + "Customer/" + customer.id, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(customer),
        })
        //TODO Возможно лучше патч, проверить
    } catch (error:any) {
        console.log(error.message);
    }
}
export const deleteCustomer = async (id,token) =>{
    try {
        await fetch(BASE_URL + "Customer/"+ id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        
    } catch (error:any) {
        console.log(error.message);
    }
}
