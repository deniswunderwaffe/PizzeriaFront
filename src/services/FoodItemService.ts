import { CreateHelp } from "../api/models/create_models/CreateHelp";
import { FoodItem } from "../api/models/FoodItem";


const BASE_URL = "https://localhost:5001/api/";


export const getFoodItemsByCategory = async (token, category: string) => {
    try {
        const response = await fetch(
            `${BASE_URL}FoodItem?Category=${category}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const responseData = await response.json();
        return responseData;

    } catch (error: any) {
        console.log(error.message);
    }
}

export const getHelp = async (help: CreateHelp) => {
    try {
        const response = await fetch(
            `${BASE_URL}FoodItem/recommendation`,
            {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(help),
            }
        );
        const responseData = await response.json();
        return responseData;

    } catch (error: any) {
        console.log(error.message);
    }
}

export const getFoodItemById = async (token, id) => {
    try {
        const response = await fetch(
            BASE_URL + "FoodItem/" + { id },
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const responseData = await response.json();
        return responseData;

    } catch (error: any) {
        console.log(error.message);
    }
}
export const addFoodItem = async (foodItem: FoodItem, token) => {
    try {
        const response = await fetch(BASE_URL + "FoodItem", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(foodItem),
        })
        const responseData = await response.json();
        return responseData;

    } catch (error: any) {
        console.log(error.message);
    }
}
export const updateFoodItem = async (foodItem: FoodItem, token) => {
    try {
        await fetch(BASE_URL + "FoodItem/" + foodItem.id, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(foodItem),
        })

    } catch (error: any) {
        console.log(error.message);
    }
}
export const deleteFoodItem = async (id, token) => {
    try {
        await fetch(BASE_URL + "FoodItem/" + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

    } catch (error: any) {
        console.log(error.message);
    }
}