import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';
import { Iaddproducts } from '../addProduct/addProduct';

export const GetProducts = async (): Promise<Iaddproducts[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products`);
    return response.data.data.products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
