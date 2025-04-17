import { BASE_URL } from "@/constants/api/api";
import axios from "axios";

const GetUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users`);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
