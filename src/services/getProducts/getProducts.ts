import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';
import { Iaddproducts } from '../addProduct/addProduct';

export interface ProductFilters {
  sort?: string;
  brand?: string;
  category?: string;
  price?: string;
  limit?: string;
}

export const GetProducts = async (
  filters: ProductFilters
): Promise<Iaddproducts[]> => {
  try {
    const {
      sort = '',
      brand = '',
      category = '',
    } = filters;

    const response = await axios.get(
      `${BASE_URL}/api/products?limit=all&sort=${sort}`
    );
    return response.data.data.products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
