import { BASE_URL } from "@/constants/api/api"
import axios from "axios"

interface Isign {
    firstname:string,
    lastname:string,
    username:string,
    password:string,
    phoneNumber:string,
    address:string
}

export const SignUser = async ({firstname,lastname,username,password,phoneNumber,address}:Isign)=>{
    try {
       const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
      firstname,
      lastname,
      username,
      password,
      phoneNumber,
      address,
    });
    console.log(response)
    return response;  
    } catch (error){
        console.log(error)
    }
}