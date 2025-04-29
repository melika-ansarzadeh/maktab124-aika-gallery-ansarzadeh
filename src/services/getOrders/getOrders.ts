import { BASE_URL } from "@/constants/api/api"
import axios from "axios"

export const GetOrders =async (isDelivered?: boolean)=>{
      const query = new URLSearchParams();

    if (isDelivered !== undefined) {
      query.append('isDelivered', isDelivered.toString());

    }
    try {
      const response = await axios.get(`${BASE_URL}/api/orders${query.toString()}`);  
      return response.data.data.orders;
    } catch (error) {
        console.log(error)
    }
}