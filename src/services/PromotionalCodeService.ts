const BASE_URL =  "https://localhost:5001/api/";

export const validateCode = async (token,code:string) =>{
    try {
        const response = await fetch(
            BASE_URL + `PromotionalCode/validate?promotionalCode=${code}`,
            {
                method:"POST",
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