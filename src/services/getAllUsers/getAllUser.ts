import { BASE_URL } from "@/constants/api/api"
import axios from "axios"

export const GetAllUsers = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/api/users`);
        console.log(response);
        return response;
    } catch (error) {
       console.log(error) 
    }
}