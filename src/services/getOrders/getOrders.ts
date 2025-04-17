import { BASE_URL } from "@/constants/api/api"
import axios from "axios"

export const GetOrders =async ()=>{
    try {
      const response = await axios.get(`${BASE_URL}/api/orders`);  
      console.log(response)
      return response.data.data.orders;
    } catch (error) {
        console.log(error)
    }
}