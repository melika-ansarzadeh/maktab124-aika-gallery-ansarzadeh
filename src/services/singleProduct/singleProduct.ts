import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';


export const GetSingleProduct = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/api/products/${id}`);
  return response.data.data.product;
};
