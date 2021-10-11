import React, { useState, useEffect } from 'react';
import { Customer } from '../api/models/Customer';
import { useAuth0 } from "@auth0/auth0-react";
import { getCustomers, addCustomer, deleteCustomer } from '../services/CustomerService';



function ClientDetails() {
    const { getAccessTokenSilently } = useAuth0();
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        getCustomersSecure();
    }, [])
    const getCustomersSecure = async () => {
        try {
            const token = await getAccessTokenSilently();
            const responseData = await getCustomers(token);
            setCustomers(responseData);
        } catch (error) {
        }
    };

    const addCustomerHandler = async () => {
        const dummyCustomer: Customer = {
            name: "React user",
            id: 1,
            email: "ract@mail.ru",
            phone: "123124124",
            isConfirmed: true,
            address: "ract address"
        }
        const token = await getAccessTokenSilently();
        const responseData = await addCustomer(dummyCustomer, token);
        console.log(responseData);
    }
    const deleteCustomerHandler = async ()=>{
        const token = await getAccessTokenSilently();
        await deleteCustomer(3,token);
      }
    return (
        <div>
             <button onClick={addCustomerHandler}>Add</button> 
             <button onClick={deleteCustomerHandler}>Delete</button>   

        </div>
    )
}

export default ClientDetails
