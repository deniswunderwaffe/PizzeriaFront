const BASE_URL = "https://localhost:5001/api/";


export const getFoodItemExtraForFoodItem = async (token, id: number) => {
    try {
        const response = await fetch(
            BASE_URL + `FoodItemExtra?foodItemId=${id}`,
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